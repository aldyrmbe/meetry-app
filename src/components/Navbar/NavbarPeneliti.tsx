import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/Navbar/NavLink"
import NavWrapper from "@components/Navbar/NavWrapper"
import { axiosInstance } from "@lib/service/axios"
import { showToast } from "@lib/toast/toast"
import { useRouter } from "next/router"
import { getRoleBasedPath } from "@lib/utils/basePath"

const NavbarPeneliti = () => {
  const router = useRouter()
  const toast = useToast()
  const handleLogout = () => {
    axiosInstance.post("/backend/user/logout").then((res) => {
      router.replace("/")
      showToast(toast, {
        title: "Logout berhasil",
        status: "success"
      })
    })
  }

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
            <Link onClick={handleLogout}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavbarPeneliti
