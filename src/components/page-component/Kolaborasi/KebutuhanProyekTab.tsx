import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import LinkifyText from "@components/Linkify/LinkifyText"
import { useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import DalamDiskusiAlert from "./DalamDiskusiAlert"

type KebutuhanProyekTabProps = {
  isLoading: boolean
  data: ProyekDetailApiResponseData
}

const Divider = ({ mt, mb }: { mt?: any; mb?: any }) => {
  return <Box w="100%" h="2px" mt={mt ?? "32px"} mb={mb} backgroundColor="gray.100"></Box>
}

const KebutuhanProyekTab = ({ isLoading, data }: KebutuhanProyekTabProps) => {
  const { role } = useContext(KolaborasiPageContext)

  const getPartisipanName = () => {
    if (data.pemohon === "PENELITI") return "Mitra"
    return "Peneliti"
  }

  const getPartisipanFallback = () => {
    if (data.pemohon === "PENELITI") return "(belum ada mitra)"
    return "(belum ada peneliti)"
  }
  return (
    <Box h="calc(100vh - 80px - 200px)" overflowX="auto" overflowY="scroll">
      {isLoading ? (
        <Flex w="100%" h="100%" flexDir="column" justifyContent="center" align="center" gap="32px">
          <Spinner></Spinner>
          <Text>Memuat proyek...</Text>
        </Flex>
      ) : (
        <>
          <DalamDiskusiAlert status={data.status} role={role!} pemohon={role!}></DalamDiskusiAlert>
          {data.kebutuhanProyek &&
            data.kebutuhanProyek.map((kebutuhanProyek, index, arr) => {
              const length = arr.length
              return (
                <Box key={index}>
                  <Text fontSize="xl" color="gray.700" fontWeight="semibold">
                    Kebutuhan {index + 1}
                  </Text>
                  <Flex mt="32px" flexDir="column" gap="8px">
                    <Text fontSize="md" color="gray.500">
                      {getPartisipanName()} pendukung
                    </Text>
                    <LinkifyText
                      fontSize="lg"
                      value={kebutuhanProyek.partisipan || getPartisipanFallback()}
                    ></LinkifyText>
                  </Flex>
                  <Divider></Divider>
                  <Flex mt="32px" flexDir="column" gap="8px">
                    <Text fontSize="md" color="gray.500">
                      Kebutuhan-kebutuhan proyek
                    </Text>
                    <Text fontSize="lg">{kebutuhanProyek.kebutuhanProyek}</Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex mt="32px" flexDir="column" gap="8px">
                    <Text fontSize="md" color="gray.500">
                      Bentuk kolaborasi yang diharapkan
                    </Text>
                    <Text fontSize="lg">{kebutuhanProyek.bentukKolaborasi}</Text>
                  </Flex>
                  <Divider></Divider>
                  <Flex mt="32px" flexDir="column" gap="8px">
                    <Text fontSize="md" color="gray.500">
                      Penjelasan tambahan
                    </Text>
                    <Text fontSize="lg">{kebutuhanProyek.penjelasanTambahan}</Text>
                  </Flex>
                  {index !== length - 1 && <Divider mb="32px"></Divider>}
                </Box>
              )
            })}
        </>
      )}
    </Box>
  )
}

export default KebutuhanProyekTab
