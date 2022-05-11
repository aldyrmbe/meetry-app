import { PenelitiDetail, SearchPenelitiApiResponse } from "@/types/api-response/search-peneliti"
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Fade, Flex, Image, Link, StackDivider, Text, VStack } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "src/service/axios"
import SearchResultWrapper from "./SearchResultWrapper"

const PenelitiSearchResult = () => {
  const router = useRouter()
  const searchQuery = router.query.searchQuery ?? ""
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [penelitiListData, setPenelitiList] = useState<PenelitiDetail[]>([])

  const fetchMoreData = (pageParams: number = page) => {
    setFetching(true)
    axiosInstance
      .get<SearchPenelitiApiResponse>(`/backend/user/searchPeneliti?searchQuery=${searchQuery}&page=${pageParams}`)
      .then((res) => {
        const { penelitiList, paginationData } = res.data.data
        const { totalPage, currentPage } = paginationData
        setPenelitiList(penelitiListData.concat(penelitiList))
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setLoading(false)
        setFetching(false)
      })
  }

  const fetchInitialData = () => {
    setFetching(true)
    axiosInstance
      .get<SearchPenelitiApiResponse>(`/backend/user/searchPeneliti?searchQuery=${searchQuery}&page=0`)
      .then((res) => {
        const { penelitiList, paginationData } = res.data.data
        const { totalPage, currentPage } = paginationData
        setPenelitiList(penelitiList)
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setLoading(false)
        setFetching(false)
      })
  }

  useEffect(() => {
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPenelitiList([])
    setPage(0)
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <SearchResultWrapper>
      <Text fontSize="xl" fontWeight="semibold">
        Peneliti
      </Text>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <Fade in={true}>
          <VStack align="stretch" divider={<StackDivider />} spacing="20px" mt="10px">
            {penelitiListData.map((peneliti) => (
              <Flex key={peneliti.id} justify="space-between" gap="20px" align="flex-start">
                <Image boxSize="80px" objectFit="cover" alt="Mitra profile" src={peneliti.fotoProfil}></Image>
                <Flex flexDir="column" flex="1" gap="8px">
                  <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                    {peneliti.nama}
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    {peneliti.programStudi}
                  </Text>
                </Flex>
                <Link target="_blank" href={peneliti.profileUrl}>
                  <OutlinedButton size="sm" rightIcon={<ExternalLinkIcon />}>
                    Lihat Profil
                  </OutlinedButton>
                </Link>
              </Flex>
            ))}
          </VStack>
          {hasMore && (
            <>
              <Divider my="20px"></Divider>
              <Button
                variant="ghost"
                w="100%"
                mt="10px"
                onClick={() => setPage((prevPage) => prevPage + 1)}
                rightIcon={<ChevronDownIcon />}
                isLoading={!isLoading && isFetching}
              >
                Lihat lebih banyak
              </Button>
            </>
          )}
          {!isFetching && !hasMore && (
            <Flex h="40px" mt="20px" justify="center" align="center">
              <Text align="center">Tidak ada data yang bisa ditampilkan lagi</Text>
            </Flex>
          )}
        </Fade>
      )}
    </SearchResultWrapper>
  )
}

export default PenelitiSearchResult
