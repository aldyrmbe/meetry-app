import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
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
  const router = useRouter()
  const folderId = router.query.folderId as string
  const subFolderId = router.query.subFolderId as string
  const { role } = useContext(KolaborasiPageContext)

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
    <Box h="calc(100vh - 80px - 200px)" overflowY="scroll">
      {isLoading ? (
        <Flex w="100%" h="100%" flexDir="column" justifyContent="center" align="center" gap="32px">
          <Spinner></Spinner>
          <Text>Memuat proyek...</Text>
        </Flex>
      ) : (
        <>
          <DalamDiskusiAlert status={data.status} role={role!} pemohon={data.pemohon}></DalamDiskusiAlert>
          {data.folders == null ? (
            <Box>
              <Text fontSize="xl" fontWeight="semibold">
                Belum ada logbook disini
              </Text>
              <Flex mt="32px" gap="32px" flexDir="column" align="center">
                <Box w="300px" h="300px">
                  <Image alt="Logbook empty" w="100%" h="100%" src="/logbook-kosong-illustration.webp"></Image>
                </Box>
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
