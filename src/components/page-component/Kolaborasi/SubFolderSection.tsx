import { StatusType } from "@/types/api-response/get-proyek-list"
import { GetSubFoldersApiResponse, SubFolder } from "@/types/api-response/get-subfolders"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import FolderIcon from "@components/icon/FolderIcon"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import AddSubFolderSection from "./AddSubFolderSection"
import SubFolderItem from "./SubFolderItem"

type SubFolderSectionType = {
  status: StatusType
}

const SubFolderSection = ({ status }: SubFolderSectionType) => {
  const router = useRouter()
  const folderId = router.query.folderId as string
  const { role } = useContext(KolaborasiPageContext)
  const [subFolders, setSubFolders] = useState<SubFolder[]>()
  const [folderName, setFolderName] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAddingSubFolder, setAddingSubFolder] = useState<boolean>(false)

  const getSubFolders = (folderIdParam?: string) => {
    axiosInstance
      .get<GetSubFoldersApiResponse>(`/backend/proyek/folder/${folderIdParam ?? folderId}`)
      .then((response) => {
        setLoading(false)
        setSubFolders(response.data.data.subFolders)
        setFolderName(response.data.data.folderName)
      })
  }

  useEffect(() => {
    if (folderId) {
      getSubFolders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId])

  const setSubFolderAttribute = (subFolderId: string, subFolderName: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          subFolderId,
          subFolderName
        }
      },
      undefined,
      { shallow: true }
    )
  }

  const removeFolderId = () => {
    delete router.query.folderId
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query
        }
      },
      undefined,
      { shallow: true }
    )
  }

  const onSubFolderClick = (subFolderId: string, subFolderName: string) => {
    setSubFolderAttribute(subFolderId, subFolderName)
  }

  return (
    <Box>
      {folderId && isLoading ? (
        <Flex w="100%" h="400px" align="center" justify="center">
          <Spinner size="xl"></Spinner>
        </Flex>
      ) : (
        <Box>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="16px">
              <ArrowBackIcon w="23px" h="32px" onClick={removeFolderId} cursor="pointer"></ArrowBackIcon>
              <Text fontSize="xl" fontWeight="semibold">
                {folderName}
              </Text>
            </Flex>
            {isLogbookOperationsAvailable(status, role!) && (
              <PrimaryButton onClick={() => setAddingSubFolder(true)}>Tambah Folder</PrimaryButton>
            )}
          </Flex>
          {subFolders?.length == 0 ? (
            <>
              {!isAddingSubFolder && <Text mt="32px">Subfolder kosong</Text>}
              {isAddingSubFolder && (
                <Box mt="32px">
                  <AddSubFolderSection getSubFolders={getSubFolders} setAddingSubFolder={setAddingSubFolder} />
                </Box>
              )}
            </>
          ) : (
            <VStack mt="32px" divider={<StackDivider></StackDivider>} spacing="20px" align="start">
              {subFolders?.map((subFolder) => (
                <SubFolderItem
                  getSubFolders={getSubFolders}
                  key={subFolder.id}
                  subFolder={subFolder}
                  onSubFolderClick={onSubFolderClick}
                  status={status}
                ></SubFolderItem>
              ))}
              {isAddingSubFolder && (
                <AddSubFolderSection
                  getSubFolders={getSubFolders}
                  setAddingSubFolder={setAddingSubFolder}
                ></AddSubFolderSection>
              )}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default SubFolderSection
