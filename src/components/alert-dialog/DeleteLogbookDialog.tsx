import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type DeleteLogbookDialogType = {
  isOpen: boolean
  onClose: () => void
  logbookId: string
  cancelRef: any
  reFetchLogbooks: (proyekId: string, subFolderId: string) => void
}

const DeleteLogbookDialog = ({ isOpen, onClose, logbookId, cancelRef, reFetchLogbooks }: DeleteLogbookDialogType) => {
  const router = useRouter()
  const proyekId = router.query.proyekId as string
  const subFolderId = router.query.subFolderId as string
  const [isLoading, setLoading] = useState<boolean>(false)

  const onLogbookDelete = () => {
    setLoading(true)
    axiosInstance
      .delete(`/backend/logbook/${proyekId}/${logbookId}`)
      .then((res) => {
        setLoading(false)
        onClose()
        reFetchLogbooks(proyekId, subFolderId)
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
            Hapus Logbook?
          </AlertDialogHeader>

          <AlertDialogBody>
            Logbook yang sudah dihapus tidak dapat dipulihkan kembali. Apakah anda yakin menghapus logbook?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="red" isLoading={isLoading} onClick={onLogbookDelete} ml={3}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteLogbookDialog
