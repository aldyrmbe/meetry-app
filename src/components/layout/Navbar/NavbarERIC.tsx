import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Link, useToast } from "@chakra-ui/react"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import NavLink from "@components/layout/Navbar/NavLink"
import { getRoleBasedPath } from "src/utils/basePath"
import { SearchIcon } from "@chakra-ui/icons"
import { KeyboardEvent } from "react"
import { useRouter } from "next/router"
import handleLogout from "src/utils/handleLogout"
import SearchBarInput from "@components/input/SearchBarInput"

const NavbarERIC = () => {
  const router = useRouter()
  const toast = useToast()

  const handleSearchInput = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement
      const searchQuery = input.value
      router.push(getRoleBasedPath("eric", `/search?searchQuery=${searchQuery}`))
    }
  }

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="32px" align="center">
          <Box as="a" href="/peneliti/dashboard">
            <Image src="/logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <SearchBarInput
            placeholder="Cari peneliti, mitra, atau account officer disini"
            onKeyDown={handleSearchInput}
          ></SearchBarInput>
          <Flex align="center" justify="center">
            <NavLink text="Beranda" href={getRoleBasedPath("eric", "/dashboard")} mr="32px"></NavLink>
            <NavLink text="Kolaborasi Saya" href="/about" path="/about" mr="32px"></NavLink>
            <Link onClick={() => handleLogout(router, toast)}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavbarERIC
