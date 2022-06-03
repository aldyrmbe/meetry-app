import { StatusType } from "@/types/api-response/get-proyek-list"
import { SubFolder } from "@/types/api-response/get-subfolders"
import { Flex, Input, Text, useDisclosure } from "@chakra-ui/react"
import DeleteSubFolderDialog from "@components/alert-dialog/DeleteSubFolderDialog"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import FolderIcon from "@components/icon/FolderIcon"
import { isLogbookOperationsAvailable } from "@utils/logbookOperation"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type SubFolderItemType = {
  subFolder: SubFolder
  onSubFolderClick: (subFolderId: string, subFolderName: string) => void
  status: StatusType
  getSubFolders: (folderId: string) => void
}

const SubFolderItem = ({ subFolder, onSubFolderClick, status, getSubFolders }: SubFolderItemType) => {
  const router = useRouter()
  const folderId = router.query.folderId as string
  const { role } = useContext(KolaborasiPageContext)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [isSending, setSending] = useState<boolean>(false)
  const [editedSubFolderName, setEditedSubFolderName] = useState<string>(subFolder.namaSubFolder)
  const {
    isOpen: isDeleteSubFolderDialogOpen,
    onOpen: onDeleteSubFolderDialongOpen,
    onClose: onDeleteSubFolderDialogClose
  } = useDisclosure()
  const cancelRef = useRef()

  const onSubFolderNameChange = (e: any) => {
    setEditedSubFolderName(e.target.value)
  }

  const editSubFolderName = () => {
    if (editedSubFolderName == subFolder.namaSubFolder) {
      setEditing(false)
    } else {
      setEditing(true)
      setSending(true)
      axiosInstance
        .put(`/backend/proyek/folder/${folderId}/subFolder/${subFolder.id}?subFolderName=${editedSubFolderName}`)
        .then((res) => {
          setEditing(false)
          setSending(false)
          getSubFolders(folderId)
        })
    }
  }

  return (
    <>
      <Flex w="100%" key={subFolder.id} align="center" justify="space-between" gap={isEditing ? "16px" : "0"}>
        <Flex gap="16px" align="center" cursor="pointer" w="100%">
          <FolderIcon></FolderIcon>
          {!isEditing && (
            <Text fontSize="lg" onClick={() => onSubFolderClick(subFolder.id, subFolder.namaSubFolder)}>
              {subFolder.namaSubFolder}
            </Text>
          )}
          {isLogbookOperationsAvailable(status, role!) && isEditing && (
            <Input w="100%" type="text" defaultValue={subFolder.namaSubFolder} onChange={onSubFolderNameChange}></Input>
          )}
        </Flex>
        {isLogbookOperationsAvailable(status, role!) && !isEditing && (
          <Flex gap="20px">
            <OutlinedButton onClick={() => setEditing(true)}>Edit Nama</OutlinedButton>
            <OutlinedButton onClick={onDeleteSubFolderDialongOpen}>Hapus</OutlinedButton>
          </Flex>
        )}
        {isLogbookOperationsAvailable(status, role!) && isEditing && (
          <PrimaryButton onClick={editSubFolderName} isLoading={isSending} loadingText="Menyimpan...">
            Simpan
          </PrimaryButton>
        )}
      </Flex>
      <DeleteSubFolderDialog
        getSubFolders={getSubFolders}
        isOpen={isDeleteSubFolderDialogOpen}
        onClose={onDeleteSubFolderDialogClose}
        cancelRef={cancelRef}
        subFolderId={subFolder.id}
      ></DeleteSubFolderDialog>
    </>
  )
}

export default SubFolderItem
