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
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type DeleteSubFolderDialogType = {
  isOpen: boolean
  onClose: () => void
  subFolderId: string
  cancelRef: any
}

const DeleteSubFolderDialog = ({ isOpen, onClose, subFolderId, cancelRef }: DeleteSubFolderDialogType) => {
  const { setFolderId, folderId } = useContext(KolaborasiPageContext)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubFolderDelete = () => {
    setLoading(true)
    axiosInstance
      .delete(`/backend/proyek/subFolder/${subFolderId}`)
      .then((res) => {
        setLoading(false)
        setFolderId(undefined)
        setFolderId(folderId)
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
            Hapus Sub Folder?
          </AlertDialogHeader>

          <AlertDialogBody>
            Sub folder yang sudah dihapus tidak dapat dipulihkan kembali. Apakah anda yakin?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="red" isLoading={isLoading} onClick={onSubFolderDelete} ml={3}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteSubFolderDialog
