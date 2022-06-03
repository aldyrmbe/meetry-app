import { GetLogbooksApiResponse, LogbookData } from "@/types/api-response/get-logbooks"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Flex, Spinner, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import AddLogbookModal from "@components/modal/AddLogbookModal"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import LogbookItem from "./LogbookItem"

type LogbookListSectionType = {
  status: StatusType
}

const Divider = () => {
  return <Box w="100%" my="32px" h="4px" backgroundColor="gray.200" borderRadius="full"></Box>
}

const LogbookListSection = ({ status }: LogbookListSectionType) => {
  const router = useRouter()

  const proyekId = router.query.proyekId as string
  const subFolderId = router.query.subFolderId as string
  const subFolderName = router.query.subFolderName as string

  const { role } = useContext(KolaborasiPageContext)
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

  const reFetchLogbooks = (proyekIdParam: string, subFolderIdParam: string) => {
    setFetching(true)
    axiosInstance
      .get<GetLogbooksApiResponse>(`/backend/logbook/${proyekId}/${subFolderId}/getLogbooks?page=0`)
      .then((response) => {
        const data = response.data.data
        const { currentPage, totalPage } = data.paginationData
        setPage(1)
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setLogbookData(data.logbookData)
        setFetching(false)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchLogbooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeSubFolderId = () => {
    delete router.query.subFolderId
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Flex w="100%" h="400px" align="center" justify="center">
          <Spinner size="xl"></Spinner>
        </Flex>
      ) : (
        <Box>
          <Flex align="center" gap="16px">
            <ArrowBackIcon w="23px" h="32px" onClick={removeSubFolderId} cursor="pointer"></ArrowBackIcon>
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
          <VStack mt="32px" divider={<Divider />} spacing="32px" align="start">
            {logbookData.map((logbook) => (
              <LogbookItem reFetchLogbooks={reFetchLogbooks} status={status} key={logbook.id} data={logbook} />
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
        reFetchLogbooks={reFetchLogbooks}
        isOpen={isAddLogbookModalOpen}
        onClose={onAddLogbookModalClose}
      />
    </>
  )
}

export default LogbookListSection
