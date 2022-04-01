import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  IconButton,
  Image,
  Text,
  Flex,
  Skeleton
} from "@chakra-ui/react"
import useSearchPermohonanProyek from "@lib/hooks/useSearchPermohonanProyek"
import TableFooter from "./TableFooter"

interface TableListProyekProps {
  type: "mitra" | "peneliti"
  searchQuery: string
  setProyekId: (proyekId: string) => void
}

const TableListProyek = ({ type, searchQuery, setProyekId }: TableListProyekProps) => {
  const { data, isLoading, setPage } = useSearchPermohonanProyek(type, searchQuery)
  console.log(data)

  return (
    <Box mt="32px" p="0" borderWidth="1px" borderRadius="6px">
      <Table>
        <Thead>
          <Tr>
            <Th textTransform="capitalize" backgroundColor="gray.50">
              Peneliti
            </Th>
            <Th textTransform="capitalize" backgroundColor="gray.50">
              Judul Proyek
            </Th>
            <Th textTransform="capitalize" backgroundColor="gray.50">
              Bidang Mitra yang Dicari
            </Th>
            <Th backgroundColor="gray.50"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading
            ? [...Array(5)].map((n, index) => (
                <Tr key={index}>
                  <Td w="25%">
                    <Flex gap="12px">
                      <Skeleton borderRadius="full" h="40px" w="40px"></Skeleton>
                      <Skeleton h="40px" w="70%"></Skeleton>
                    </Flex>
                  </Td>
                  <Td w="30%">
                    <Skeleton h="40px" />
                  </Td>
                  <Td w="30%">
                    <Skeleton h="40px" />
                  </Td>
                  <Td>
                    <Skeleton borderRadius="full" h="40px" w="40px" />
                  </Td>
                </Tr>
              ))
            : data?.data.map((proyek, index) => (
                <Tr key={index}>
                  <Td w="25%" p="16px auto 16px 24px">
                    <HStack spacing="12px">
                      <Image
                        alt="Profile Image"
                        boxSize="40px"
                        borderRadius="full"
                        src={proyek.fotoProfil}
                      ></Image>
                      <Text fontWeight="medium" fontSize="sm">
                        {proyek.nama}
                      </Text>
                    </HStack>
                  </Td>
                  <Td w="30%">
                    <Text fontSize="sm">{proyek.judulProyek}</Text>
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
              ))}
        </Tbody>
      </Table>
      <TableFooter data={data} setPage={setPage} isLoading={isLoading}></TableFooter>
    </Box>
  )
}

export default TableListProyek
