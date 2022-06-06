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

type DeleteSubFolderDialogType = {
  isOpen: boolean
  onClose: () => void
  subFolderId: string
  cancelRef: any
  getSubFolders: (folderId: string) => void
}

const DeleteSubFolderDialog = ({
  isOpen,
  onClose,
  subFolderId,
  cancelRef,
  getSubFolders
}: DeleteSubFolderDialogType) => {
  const router = useRouter()
  const folderId = router.query.folderId as string
  const setFolderId = (folderId: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, folderId }
      },
      undefined,
      {
        shallow: true
      }
    )
  }
  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubFolderDelete = () => {
    setLoading(true)
    axiosInstance
      .delete(`/backend/proyek/subFolder/${subFolderId}`)
      .then((res) => {
        setLoading(false)
        setFolderId(folderId)
        onClose()
        getSubFolders(folderId)
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
