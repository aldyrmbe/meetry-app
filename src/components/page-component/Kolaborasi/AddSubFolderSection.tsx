import { Flex, Input } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import PrimaryButton from "@components/button/PrimaryButton"
import FolderIcon from "@components/icon/FolderIcon"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type AddSubFolderSectionType = {
  setAddingSubFolder: (param: boolean) => void
  getSubFolders: (folderId: string) => void
}

const AddSubFolderSection = ({ setAddingSubFolder, getSubFolders }: AddSubFolderSectionType) => {
  const router = useRouter()
  const folderId = router.query.folderId as string

  const [newSubFolderName, setNewSubFolderName] = useState<string>("")
  const [isDisabled, setDisabled] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onChange = (e: any) => {
    setNewSubFolderName(e.target.value)
    if (e.target.value == "") {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const onAddFolder = () => {
    setLoading(true)
    axiosInstance
      .post(`/backend/proyek/folder/${folderId}/addSubFolder?subFolderName=${newSubFolderName}`)
      .then((res) => {
        setLoading(false)
        setAddingSubFolder(false)
        getSubFolders(folderId)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <Flex gap="16px" align="center" cursor="pointer" w="100%">
      <FolderIcon></FolderIcon>
      <Input w="100%" type="text" defaultValue={newSubFolderName} onChange={onChange}></Input>
      <PrimaryButton onClick={onAddFolder} isDisabled={isDisabled} isLoading={isLoading}>
        Simpan
      </PrimaryButton>
      <OutlinedButton onClick={() => setAddingSubFolder(false)}>Batal</OutlinedButton>
    </Flex>
  )
}

export default AddSubFolderSection
