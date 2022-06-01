import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import { useRouter } from "next/router"
import handleLogout from "src/utils/handleLogout"

type NavAccountOfficerType = {
  onOpen: () => void
}

const NavAccountOfficer = ({ onOpen }: NavAccountOfficerType) => {
  const router = useRouter()
  const toast = useToast()

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="16px" align="center">
          <Box as="a" href="/accountofficer/kolaborasi">
            <Image src="/meetry-officer-logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink text="Kolaborasi Saya" href={`/accountofficer/kolaborasi`} mr="32px"></NavLink>
            <Link onClick={onOpen}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavAccountOfficer
