import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type DeleteLogbookDialogType = {
  isOpen: boolean
  onClose: () => void
  logbookId: string
  cancelRef: any
}

const DeleteLogbookDialog = ({ isOpen, onClose, logbookId, cancelRef }: DeleteLogbookDialogType) => {
  const { proyekId, setSubFolderId, subFolderId } = useContext(KolaborasiPageContext)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onLogbookDelete = () => {
    setLoading(true)
    axiosInstance
      .delete(`/backend/logbook/${proyekId}/${logbookId}`)
      .then((res) => {
        setLoading(false)
        setSubFolderId(undefined)
        setSubFolderId(subFolderId)
        onClose()
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
