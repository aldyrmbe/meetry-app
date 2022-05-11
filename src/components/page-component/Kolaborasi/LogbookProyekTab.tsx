import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import DalamDiskusiAlert from "./DalamDiskusiAlert"
import FolderSection from "./FolderSection"
import LogbookListSection from "./LogbookListSection"
import SubFolderSection from "./SubFolderSection"

type LogbookProyekTabType = {
  isLoading: boolean
  data: ProyekDetailApiResponseData
}

const LogbookProyekTab = ({ isLoading, data }: LogbookProyekTabType) => {
  const { role, folderId, subFolderId } = useContext(KolaborasiPageContext)

  const getSection = (status: StatusType) => {
    if (folderId && subFolderId) {
      return <LogbookListSection status={status}></LogbookListSection>
    }
    if (folderId) {
      return <SubFolderSection status={status}></SubFolderSection>
    }
    return <FolderSection folders={data.folders!}></FolderSection>
  }

  return (
    <Box h="calc(100vh - 80px - 200px)" overflowX="hidden" overflowY="scroll">
      {isLoading ? (
        <Flex w="100%" h="100%" flexDir="column" justifyContent="center" align="center" gap="32px">
          <Spinner></Spinner>
          <Text>Memuat proyek...</Text>
        </Flex>
      ) : (
        <>
          <DalamDiskusiAlert status={data.status} role={role!} pemohon={role!}></DalamDiskusiAlert>
          {data.folders == null ? (
            <Box>
              <Text fontSize="xl" fontWeight="semibold">
                Belum ada logbook disini
              </Text>
              <Flex mt="64px" gap="32px" flexDir="column" align="center">
                <Box w="350px" h="270px" backgroundColor="gray.100"></Box>
                <Text align="center">
                  Logbook akan diisi oleh Account Officer setelah kami berhasil<br></br> menemukan mitra yang potensial
                  untuk Anda
                </Text>
              </Flex>
            </Box>
          ) : (
            <section>{getSection(data.status)}</section>
          )}
        </>
      )}
    </Box>
  )
}

export default LogbookProyekTab
