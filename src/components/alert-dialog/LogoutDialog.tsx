import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  useToast
} from "@chakra-ui/react"
import handleLogout from "@utils/handleLogout"
import { useRouter } from "next/router"

type LogoutDialogType = {
  isOpen: boolean
  onClose: () => void
  cancelRef: any
}

const LogoutDialog = ({ isOpen, onClose, cancelRef }: LogoutDialogType) => {
  const router = useRouter()
  const toast = useToast()

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent p="16px">
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">
            Ingin Logout?
          </AlertDialogHeader>

          <AlertDialogBody>Apakah anda yakin ingin keluar dari akun Anda?</AlertDialogBody>

          <AlertDialogFooter>
            <Flex w="100%" gap="20px">
              <Button w="50%" colorScheme="teal" ref={cancelRef} onClick={onClose}>
                Tidak
              </Button>
              <Button w="50%" onClick={() => handleLogout(router, toast)}>
                Iya
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default LogoutDialog
