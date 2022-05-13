import { Box, Flex, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { useRouter } from "next/router"
import { Role } from "src/service/user"

type RequestProyekSuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  role: Role
}

const RequestProyekSuccessModal = ({ isOpen, onClose, role }: RequestProyekSuccessModalProps) => {
  const router = useRouter()
  const redirectToDashboard = () => {
    router.push(`/${role.toLowerCase()}/dashboard`)
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="32px">
        <Flex flexDir="column" align="center" gap="32px">
          <Box w="200px" h="200px" backgroundColor="gray.200"></Box>
          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
            Berhasil mengirimkan pengajuan
          </Text>
          <Text textAlign="center">
            Kami akan memberi tahu Anda di bagian Notifikasi jika kami sudah<br></br> menemukan mitra yang tepat untuk
            Anda. Anda bisa melihat riwayat pengajuan ini di halaman Kolaborasi Saya
          </Text>
          <PrimaryButton onClick={redirectToDashboard} px="116px">
            Kembali ke Beranda
          </PrimaryButton>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default RequestProyekSuccessModal
