import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/Navbar/NavLink"
import NavWrapper from "@components/Navbar/NavWrapper"
import { useRouter } from "next/router"
import { getRoleBasedPath } from "@lib/utils/basePath"
import handleLogout from "@lib/utils/handleLogout"

const NavbarPeneliti = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="16px" align="center">
          <Box as="a" href="/peneliti/dashboard">
            <Image src="/logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink
              text="Beranda"
              href={getRoleBasedPath("peneliti", "/dashboard")}
              mr="32px"
            ></NavLink>
            <NavLink text="Kolaborasi Saya" href="/about" path="/about" mr="32px"></NavLink>
            <Link onClick={() => handleLogout(router, toast)}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavbarPeneliti
