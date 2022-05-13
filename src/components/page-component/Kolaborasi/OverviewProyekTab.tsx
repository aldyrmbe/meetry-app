import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { Box, Divider, Flex, Spinner, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import DalamDiskusiAlert from "./DalamDiskusiAlert"
import ParticipantsSection from "./ParticipantsSection"
import ProyekInformations from "./ProyekInformations"
import ProyekOperations from "./ProyekOperations"

type OverviewProyekTabType = {
  isLoading: boolean
  data: ProyekDetailApiResponseData
}

const OverviewProyekTab = ({ data, isLoading }: OverviewProyekTabType) => {
  const { role } = useContext(KolaborasiPageContext)

  return (
    <Box h="calc(100vh - 80px - 200px)" overflowX="hidden" overflowY="scroll">
      {isLoading ? (
        <Flex w="100%" h="100%" flexDir="column" justifyContent="center" align="center" gap="32px">
          <Spinner></Spinner>
          <Text>Memuat proyek...</Text>
        </Flex>
      ) : (
        <Box w="100%">
          {(role == "ERIC" || role == "ACCOUNT_OFFICER") && <ProyekOperations status={data.status}></ProyekOperations>}
          <DalamDiskusiAlert status={data.status} role={role!} pemohon={role!}></DalamDiskusiAlert>
          <Text fontSize="xl" fontWeight="semibold">
            {data.overviewProyek.judul}
          </Text>
          <ParticipantsSection data={data.overviewProyek.partisipan}></ParticipantsSection>
          <Divider mt="32px" borderWidth="1px" backgroundColor="gray.200"></Divider>
          <ProyekInformations data={data.overviewProyek}></ProyekInformations>
        </Box>
      )}
    </Box>
  )
}

export default OverviewProyekTab
