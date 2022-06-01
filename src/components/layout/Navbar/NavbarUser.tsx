import { useDisclosure } from "@chakra-ui/react"
import LogoutDialog from "@components/alert-dialog/LogoutDialog"
import { useRef } from "react"
import { Role } from "src/service/user"
import NavAccountOfficer from "./NavAccountOfficer"
import NavERIC from "./NavERIC"
import NavMitra from "./NavMitra"
import NavPeneliti from "./NavPeneliti"

type NavbarUserType = {
  id: string
  role: Role
}

const NavbarUser = ({ id, role }: NavbarUserType) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      {role === "PENELITI" && <NavPeneliti onOpen={onOpen} id={id} />}
      {role === "MITRA" && <NavMitra onOpen={onOpen} id={id} />}
      {role === "ACCOUNT_OFFICER" && <NavAccountOfficer onOpen={onOpen} />}
      {role === "ERIC" && <NavERIC onOpen={onOpen} />}
      <LogoutDialog isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} />
    </>
  )
}

export default NavbarUser
