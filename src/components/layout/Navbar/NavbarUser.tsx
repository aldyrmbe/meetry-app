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
  return (
    <>
      {role === "PENELITI" && <NavPeneliti id={id}></NavPeneliti>}
      {role === "MITRA" && <NavMitra id={id}></NavMitra>}
      {role === "ACCOUNT_OFFICER" && <NavAccountOfficer></NavAccountOfficer>}
      {role === "ERIC" && <NavERIC></NavERIC>}
    </>
  )
}

export default NavbarUser
