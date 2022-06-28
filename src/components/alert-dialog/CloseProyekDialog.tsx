import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { axiosInstance } from "src/service/axios"

type CloseProyekDialogType = {
  isOpen: boolean
  onClose: () => void
  proyekId: string
  cancelRef: any
}

const CloseProyekDialog = ({ isOpen, onClose, proyekId, cancelRef }: CloseProyekDialogType) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onProyekClose = () => {
    setLoading(true)
    axiosInstance
      .put(`/backend/proyek/${proyekId}/close`)
      .then((res) => {
        setLoading(false)
        router.reload()
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent p="20px">
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">
            Selesaikan Proyek?
          </AlertDialogHeader>

          <AlertDialogBody>
            Proyek ini akan ditandai sebagai proyek yang selesai. Semua logbook tetap tersimpan di sini. Apakah Anda
            yakin ingin menyelesaikan proyek ini sekarang?
          </AlertDialogBody>

          <AlertDialogFooter mt="20px">
            <Flex w="100%" gap="20px">
              <Button w="50%" colorScheme="teal" ref={cancelRef} onClick={onClose}>
                Tidak
              </Button>
              <Button w="50%" onClick={onProyekClose} isLoading={isLoading} loadingText="Memperbarui status...">
                Iya
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default CloseProyekDialog
