import { GetLogbooksApiResponse, LogbookData } from "@/types/api-response/get-logbooks"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Flex, Spinner, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import AddLogbookModal from "@components/modal/AddLogbookModal"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useContext, useEffect, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import LogbookItem from "./LogbookItem"

type LogbookListSectionType = {
  status: StatusType
}

const LogbookListSection = ({ status }: LogbookListSectionType) => {
  const { role, proyekId, subFolderId, setSubFolderId, subFolderName } = useContext(KolaborasiPageContext)
  const {
    isOpen: isAddLogbookModalOpen,
    onOpen: onAddLogbookModalOpen,
    onClose: onAddLogbookModalClose
  } = useDisclosure()
  const [logbookData, setLogbookData] = useState<LogbookData[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)

  const fetchLogbooks = () => {
    setFetching(true)
    axiosInstance
      .get<GetLogbooksApiResponse>(`/backend/logbook/${proyekId}/${subFolderId}/getLogbooks?page=${page}`)
      .then((response) => {
        const data = response.data.data
        const { currentPage, totalPage } = data.paginationData
        setPage((prevPage) => prevPage + 1)
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setLogbookData(logbookData.concat(data.logbookData))
        setFetching(false)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchLogbooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <Flex w="100%" h="400px" align="center" justify="center">
          <Spinner size="xl"></Spinner>
        </Flex>
      ) : (
        <Box>
          <Flex align="center" gap="16px">
            <ArrowBackIcon w="23px" h="32px" onClick={() => setSubFolderId(undefined)} cursor="pointer"></ArrowBackIcon>
            <Text fontSize="xl" fontWeight="semibold">
              {subFolderName}
            </Text>
          </Flex>
          {isLogbookOperationsAvailable(status, role!) && (
            <OutlinedButton
              onClick={onAddLogbookModalOpen}
              w="100%"
              mt="32px"
              size="lg"
              leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
            >
              Tambah Logbook
            </OutlinedButton>
          )}
          <VStack mt="32px" divider={<StackDivider borderWidth="1px"></StackDivider>} spacing="32px" align="start">
            {logbookData.map((logbook) => (
              <LogbookItem status={status} key={logbook.id} data={logbook}></LogbookItem>
            ))}
          </VStack>
          {hasMore && (
            <Box h="40px" mt="20px">
              <PrimaryButton
                isLoading={!isLoading && isFetching}
                loadingText="Memuat..."
                onClick={fetchLogbooks}
                w="100%"
              >
                Muat lebih banyak
              </PrimaryButton>
            </Box>
          )}
          {!isFetching && !hasMore && (
            <Flex h="40px" mt="20px" justify="center" align="center">
              <Text align="center">Tidak ada data yang bisa ditampilkan lagi</Text>
            </Flex>
          )}
        </Box>
      )}
      <AddLogbookModal
        isOpen={isAddLogbookModalOpen}
        onClose={onAddLogbookModalClose}
        subFolderId={subFolderId!}
      ></AddLogbookModal>
    </>
  )
}

export default LogbookListSection
