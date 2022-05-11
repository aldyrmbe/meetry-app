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

type CancelProyekDialogType = {
  isOpen: boolean
  onClose: () => void
  proyekId: string
  cancelRef: any
}

const CancelProyekDialog = ({ isOpen, onClose, proyekId, cancelRef }: CancelProyekDialogType) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onProyekCancel = () => {
    setLoading(true)
    axiosInstance
      .put(`/backend/proyek/${proyekId}/cancel`)
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
            Batalkan Proyek?
          </AlertDialogHeader>

          <AlertDialogBody>
            Logbook yang lama akan tetap tersimpan di sini, namun Anda tidak bisa lagi mencatat logbook yang baru.
            Apakah Anda yakin?
          </AlertDialogBody>

          <AlertDialogFooter mt="20px">
            <Flex w="100%" gap="20px">
              <Button w="50%" colorScheme="teal" ref={cancelRef} onClick={onClose}>
                Tidak
              </Button>
              <Button w="50%" onClick={onProyekCancel} isLoading={isLoading} loadingText="Memperbarui status...">
                Iya
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default CancelProyekDialog
