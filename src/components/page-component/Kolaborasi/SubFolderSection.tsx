import { StatusType } from "@/types/api-response/get-proyek-list"
import { GetSubFoldersApiResponse, SubFolder } from "@/types/api-response/get-subfolders"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import FolderIcon from "@components/icon/FolderIcon"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useEffect, useState, useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import AddSubFolderSection from "./AddSubFolderSection"
import SubFolderItem from "./SubFolderItem"

type SubFolderSectionType = {
  status: StatusType
}

const SubFolderSection = ({ status }: SubFolderSectionType) => {
  const { role, folderId, setFolderId, setSubFolderId, setSubFolderName } = useContext(KolaborasiPageContext)
  const [subFolders, setSubFolders] = useState<SubFolder[]>()
  const [folderName, setFolderName] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAddingSubFolder, setAddingSubFolder] = useState<boolean>(false)
  const getSubFolders = () => {
    axiosInstance.get<GetSubFoldersApiResponse>(`/backend/proyek/folder/${folderId}`).then((response) => {
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

  const onSubFolderClick = (subFolderId: string, subFolderName: string) => {
    setSubFolderId(subFolderId)
    setSubFolderName(subFolderName)
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
              <ArrowBackIcon w="23px" h="32px" onClick={() => setFolderId(undefined)} cursor="pointer"></ArrowBackIcon>
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
                  <AddSubFolderSection setAddingSubFolder={setAddingSubFolder}></AddSubFolderSection>
                </Box>
              )}
            </>
          ) : (
            <VStack mt="32px" divider={<StackDivider></StackDivider>} spacing="20px" align="start">
              {subFolders?.map((subFolder) => (
                <SubFolderItem
                  key={subFolder.id}
                  subFolder={subFolder}
                  onSubFolderClick={onSubFolderClick}
                  status={status}
                ></SubFolderItem>
              ))}
              {isAddingSubFolder && <AddSubFolderSection setAddingSubFolder={setAddingSubFolder}></AddSubFolderSection>}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default SubFolderSection
