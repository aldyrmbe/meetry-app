import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import { useRouter } from "next/router"
import handleLogout from "src/utils/handleLogout"

const NavMitra = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="16px" align="center">
          <Box as="a" href="/mitra/dashboard">
            <Image src="/logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink text="Beranda" href={`/mitra/dashboard`} mr="32px"></NavLink>
            <NavLink text="Kolaborasi Saya" href={`/mitra/kolaborasi`} mr="32px"></NavLink>
            <Link onClick={() => handleLogout(router, toast)}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavMitra
