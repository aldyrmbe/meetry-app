import { Role, RoleMapping } from "src/service/user"
import NavAccountOfficer from "./NavAccountOfficer"
import NavERIC from "./NavERIC"
import NavMitra from "./NavMitra"
import NavPeneliti from "./NavPeneliti"

type NavbarUserType = {
  role: Role
}

const NavbarUser = ({ role }: NavbarUserType) => {
  return (
    <>
      {role === "PENELITI" && <NavPeneliti></NavPeneliti>}
      {role === "MITRA" && <NavMitra></NavMitra>}
      {role === "ACCOUNT_OFFICER" && <NavAccountOfficer></NavAccountOfficer>}
      {role === "ERIC" && <NavERIC></NavERIC>}
    </>
  )
}

export default NavbarUser
