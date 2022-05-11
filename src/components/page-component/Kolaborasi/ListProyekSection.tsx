import { Box, Flex, IconButton, Spinner, Text } from "@chakra-ui/react"
import { GetProyekListResponse, ProyekData } from "@/types/api-response/get-proyek-list"
import FilterIcon from "@components/icon/FilterIcon"
import SearchBarInput from "@components/input/SearchBarInput"
import ProyekList from "./ProyekList"
import StatusFilter from "./StatusFilter"
import { useContext, useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import PrimaryButton from "@components/button/PrimaryButton"
import useDebounce from "@hooks/useDebounce"

const ListProyekSection = () => {
  const { toggleFilter, isFilterOpen, filter, closeFilter } = useContext(KolaborasiPageContext)
  const [page, setPage] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const debouncedSearchQuery = useDebounce(searchQuery)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [proyekData, setProyekData] = useState<ProyekData[]>([])

  const fetchKolaborasiData = () => {
    setFetching(true)
    axiosInstance
      .get<GetProyekListResponse>("/backend/proyek", {
        params: {
          page,
          status: filter,
          searchQuery: debouncedSearchQuery
        }
      })
      .then((response) => {
        const data = response.data.data
        const { currentPage, totalPage } = data.paginationData
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setProyekData(proyekData.concat(data.proyekData))
        setLoading(false)
        setFetching(false)
      })
  }

  const getKolaborasiData = () => {
    setLoading(true)
    setFetching(true)
    axiosInstance
      .get<GetProyekListResponse>("/backend/proyek", {
        params: {
          page,
          status: filter,
          searchQuery: debouncedSearchQuery
        }
      })
      .then((response) => {
        const data = response.data.data
        const { currentPage, totalPage } = data.paginationData
        setHasMore(totalPage !== 0 && currentPage !== totalPage)
        setProyekData(data.proyekData)
        setLoading(false)
        setFetching(false)
      })
  }

  useEffect(() => {
    if (page > 0) fetchKolaborasiData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    fetchKolaborasiData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setProyekData([])
    setPage(0)
    // setTimeout(() => getKolaborasiData())
    getKolaborasiData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, debouncedSearchQuery])

  return (
    <Box h="calc(100vh - 80px - 80px)">
      <Flex gap="16px">
        <SearchBarInput
          placeholder="Cari judul proyek"
          onChange={(e: any) => setSearchQuery(e.target.value)}
          onFocus={() => closeFilter()}
        ></SearchBarInput>
        <Box position="relative">
          <IconButton onClick={toggleFilter} aria-label="next" icon={<FilterIcon />}></IconButton>
          {isFilterOpen && <StatusFilter></StatusFilter>}
        </Box>
      </Flex>
      <Flex mt="32px" flexDir="column" gap="32px" overflowY="scroll" h="90%">
        {isLoading ? (
          <Flex h="100%" w="100%" align="center" justify="center">
            <Spinner></Spinner>
          </Flex>
        ) : (
          <>
            {proyekData.length > 0 ? (
              <>
                {proyekData.map((data: ProyekData, index: number) => (
                  <ProyekList key={index} data={data}></ProyekList>
                ))}
                {hasMore && (
                  <Box h="40px" mt="20px">
                    <PrimaryButton
                      isLoading={!isLoading && isFetching}
                      onClick={() => setPage((prevPage) => prevPage + 1)}
                      loadingText="Memuat..."
                      w="100%"
                    >
                      Muat lebih banyak
                    </PrimaryButton>
                  </Box>
                )}
                {!isFetching && !hasMore && <></>}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Flex>
    </Box>
  )
}

export default ListProyekSection
