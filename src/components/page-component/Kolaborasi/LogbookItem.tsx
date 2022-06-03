import { LogbookData } from "@/types/api-response/get-logbooks"
import { StatusType } from "@/types/api-response/get-proyek-list"
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react"
import DeleteLogbookDialog from "@components/alert-dialog/DeleteLogbookDialog"
import OutlinedButton from "@components/button/OutlinedButton"
import EditLogbookModal from "@components/modal/EditLogbookModal"
import { getLogbookDisplayTime, getWaktuKegiatanLogbook } from "@utils/date"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useRouter } from "next/router"
import { useContext, useRef } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import LogbookComments from "./LogbookComments"

type LogbookItemType = {
  data: LogbookData
  status: StatusType
  reFetchLogbooks: (proyekId: string, subFolderId: string) => void
}

type ItemType = {
  title: string
  content: string
}

const Item = ({ title, content }: ItemType) => {
  return (
    <Box>
      <Text display="inline" fontSize="md" color="gray.500">
        {title}:&nbsp;
      </Text>
      <Text display="inline" fontSize="md" fontWeight="semibold" color="gray.700">
        {content}
      </Text>
    </Box>
  )
}

const LogbookItem = ({ data, status, reFetchLogbooks }: LogbookItemType) => {
  const { role } = useContext(KolaborasiPageContext)
  const {
    isOpen: isEditLogbookModalOpen,
    onOpen: onEditLogbookModalOpen,
    onClose: onEditLogbookModalClose
  } = useDisclosure()
  const {
    isOpen: isDeleteLogbookDialogOpen,
    onOpen: onDeleteLogbookDialogOpen,
    onClose: onDeleteLogbookDialogClose
  } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <Flex flexDir="column" gap="24px" width="100%">
        <Flex align="center" justify="space-between">
          <Flex gap="20px" align="center">
            <Image h="32px" w="32px" borderRadius="full" alt="Mitra" src={data.sender.fotoProfil}></Image>
            <Flex gap="16px" align="center">
              <Text fontSize="md" fontWeight="semibold">
                {data.sender.nama}
              </Text>
              <Box w="8px" h="8px" borderRadius="full" backgroundColor="gray.300"></Box>
              <Text fontSize="md" fontWeight="semibold">
                {getLogbookDisplayTime(data.createdAt)}
              </Text>
            </Flex>
          </Flex>
          {isLogbookOperationsAvailable(status, role!) && (
            <Flex gap="20px">
              <OutlinedButton onClick={onEditLogbookModalOpen}>Edit</OutlinedButton>
              <OutlinedButton onClick={onDeleteLogbookDialogOpen}>Hapus</OutlinedButton>
            </Flex>
          )}
        </Flex>
        <Flex gap="20px">
          {data.tags.map((tag, index) => (
            <Box key={`${tag}-${index}`} p="2px 8px" borderWidth="1px" borderRadius="6px" borderColor="teal.500">
              <Text fontSize="sm" fontWeight="medium" color="teal.500">
                {tag}
              </Text>
            </Box>
          ))}
        </Flex>
        <Item title="Judul" content={data.judul}></Item>
        <Item title="Waktu Kegiatan" content={getWaktuKegiatanLogbook(data.waktu)}></Item>
        <Item title="Nomor Logbook" content={data.id}></Item>
        <Text fontSize="lg">{data.deskripsi}</Text>
        <Box w="100%" h="2px" backgroundColor="gray.200"></Box>
        <LogbookComments status={status} logbookId={data.id}></LogbookComments>
      </Flex>
      <EditLogbookModal
        isOpen={isEditLogbookModalOpen}
        onClose={onEditLogbookModalClose}
        data={data}
        reFetchLogbooks={reFetchLogbooks}
      ></EditLogbookModal>
      <DeleteLogbookDialog
        isOpen={isDeleteLogbookDialogOpen}
        onClose={onDeleteLogbookDialogClose}
        logbookId={data.id}
        cancelRef={cancelRef}
        reFetchLogbooks={reFetchLogbooks}
      ></DeleteLogbookDialog>
    </>
  )
}

export default LogbookItem
