import { ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { FileData, GetProyekFilesApiResponse } from "@/types/api-response/get-proyek-files"
import { Box, Flex, Spinner, StackDivider, Text, VStack, Image } from "@chakra-ui/react"
import DocumentAttachmentIcon from "@components/icon/DocumentAttachmentIcon"
import FileIcon from "@components/icon/FileIcon"
import ImageAttachmentIcon from "@components/icon/ImageAttachmentIcon"
import { useContext, useEffect, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"
import DalamDiskusiAlert from "./DalamDiskusiAlert"

type FilesProyekTabType = {
  data: ProyekDetailApiResponseData | undefined
}

const FilesProyekTab = ({ data }: FilesProyekTabType) => {
  const { proyekId, role } = useContext(KolaborasiPageContext)
  const [files, setFiles] = useState<FileData[]>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axiosInstance.get<GetProyekFilesApiResponse>(`/backend/proyek/${proyekId}/files`).then((response) => {
      setFiles(response.data.data)
      setLoading(false)
      console.log(response)
    })
  }, [proyekId])

  const openFile = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <Box h="calc(100vh - 80px - 200px)" overflowX="auto" overflowY="scroll">
      <>{data && role && <DalamDiskusiAlert status={data.status} role={role} pemohon={data.pemohon} />}</>
      {isLoading ? (
        <Flex w="100%" h="100%" flexDir="column" justifyContent="center" align="center" gap="32px">
          <Spinner></Spinner>
          <Text>Memuat proyek...</Text>
        </Flex>
      ) : files ? (
        <>
          <Text fontSize="xl" fontWeight="semibold">
            Semua File Proyek
          </Text>
          <VStack divider={<StackDivider />} mt="32px" spacing="20px" align="start">
            {files.map((file) => (
              <Flex key={file.url} gap="16px" cursor="pointer" onClick={() => openFile(file.url)}>
                <FileIcon fileName={file.name} />
                <Text fontSize="lg">{file.name}</Text>
              </Flex>
            ))}
          </VStack>
        </>
      ) : (
        <Flex w="100%" h="100%" align="center" justify="space-between" flexDir="column">
          <Text w="100%" fontSize="xl" fontWeight="semibold">
            Belum ada File apa pun di sini
          </Text>
          <Box w="470px" h="250px">
            <Image alt="Logbook empty" w="100%" h="100%" src="/empty-file-illustration.webp"></Image>
          </Box>
          <Text>Semua file yang diunggah ke Logbook akan dikumpulkan di sini</Text>
        </Flex>
      )}
    </Box>
  )
}

export default FilesProyekTab
