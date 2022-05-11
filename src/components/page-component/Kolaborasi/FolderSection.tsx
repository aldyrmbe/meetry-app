import { Text, VStack, StackDivider, Flex } from "@chakra-ui/react"
import FolderIcon from "@components/icon/FolderIcon"
import { Folder } from "@/types/api-response/get-proyek-detail"
import { useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"

type FolderSectionType = {
  folders: Folder[]
}

const FolderSection = ({ folders }: FolderSectionType) => {
  const { setFolderId } = useContext(KolaborasiPageContext)

  return (
    <>
      <Text fontSize="xl" fontWeight="semibold">
        Folder Logbook
      </Text>
      <VStack mt="32px" divider={<StackDivider></StackDivider>} spacing="20px" align="start">
        {folders.map((folder) => (
          <Flex key={folder.id} gap="16px" align="center" cursor="pointer" onClick={() => setFolderId(folder.id)}>
            <FolderIcon></FolderIcon>
            <Text fontSize="lg">{folder.namaFolder}</Text>
          </Flex>
        ))}
      </VStack>
    </>
  )
}

export default FolderSection
