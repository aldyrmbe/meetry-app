import { GetProyekOnRequestResponse, ProyekDetail } from "@/types/api-response/get-proyek-on-request"
import { PaginationData } from "@/types/base"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Table, Thead, Tr, Th, Tbody, Td, HStack, IconButton, Image, Text, Flex, Skeleton } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { axiosInstance } from "src/service/axios"
import TableFooter from "./TableFooter"

type TableListProyekType = {
  pemohon: "PENELITI" | "MITRA"
  searchQuery: string
  setProyekId: (proyekId: string) => void
}

const TableHead = ({ children, w = "25%" }: { children?: React.ReactNode; w?: string }) => {
  return (
    <Th w={w} fontWeight="extrabold" textTransform="capitalize" backgroundColor="gray.50">
      {children}
    </Th>
  )
}

const scrollBarCSS = {
  "&::-webkit-scrollbar": {
    width: 0
  },
  "&::-webkit-scrollbar-track": {
    width: 0
  },
  "&::-webkit-scrollbar-thumb": {
    background: "white",
    borderRadius: 0
  }
}

const TableListProyek = ({ pemohon, searchQuery, setProyekId }: TableListProyekType) => {
  const [proyekList, setProyekList] = useState<ProyekDetail[]>()
  const [paginationData, setPaginationData] = useState<PaginationData>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)

  const getProyekData = (pageParams: number = page) => {
    axiosInstance
      .get<GetProyekOnRequestResponse>(
        `/backend/proyek/getProyekOnRequest?pemohon=${pemohon}&page=${pageParams}&searchQuery=${searchQuery}`
      )
      .then((response) => {
        setProyekList(response.data.data.proyekList)
        setPaginationData(response.data.data.paginationData)
        setLoading(false)
      })
    setLoading(true)
  }

  useEffect(() => {
    getProyekData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPage(0)
    getProyekData(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  useEffect(() => {
    getProyekData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Box
      mt="32px"
      p="0"
      borderWidth="1px"
      borderRadius="6px"
      maxH="calc(100vh - 360px)"
      overflowY="scroll"
      __css={scrollBarCSS}
    >
      <Table>
        <Thead>
          <Tr>
            <TableHead>{pemohon.charAt(0) + pemohon.slice(1).toLowerCase()}</TableHead>
            <TableHead>Judul Proyek</TableHead>
            <TableHead>Bidang Proyek</TableHead>
            <TableHead></TableHead>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <></>
          ) : (
            proyekList?.map((proyek) => (
              <Tr key={proyek.id}>
                <Td w="25%" p="16px auto 16px 24px">
                  <HStack spacing="12px">
                    <Image alt="Profile Image" boxSize="40px" borderRadius="full" src={proyek.fotoProfil}></Image>
                    <Text fontWeight="medium" fontSize="sm">
                      {proyek.pemohon}
                    </Text>
                  </HStack>
                </Td>
                <Td w="30%">
                  <Text fontSize="sm">{proyek.judul}</Text>
                </Td>
                <Td w="30%">
                  <Text fontSize="sm">{proyek.bidang}</Text>
                </Td>
                <Td>
                  <IconButton
                    icon={<ChevronRightIcon w="16px" h="16px" />}
                    borderRadius="full"
                    backgroundColor="transparent"
                    aria-label="detailProyek"
                    onClick={() => setProyekId(proyek.id)}
                  ></IconButton>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <TableFooter paginationData={paginationData} setPage={setPage} isLoading={isLoading}></TableFooter>
    </Box>
  )
}

export default TableListProyek
