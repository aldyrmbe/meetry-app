import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Link, useToast } from "@chakra-ui/react"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import NavLink from "@components/layout/Navbar/NavLink"
import { getRoleBasedPath } from "src/utils/basePath"
import { SearchIcon } from "@chakra-ui/icons"
import { KeyboardEvent } from "react"
import { useRouter } from "next/router"
import handleLogout from "src/utils/handleLogout"
import SearchBarInput from "@components/input/SearchBarInput"

type NavERIC = {
  onOpen: () => void
}

const NavERIC = ({ onOpen }: NavERIC) => {
  const router = useRouter()
  const toast = useToast()
  const defaultValue = router.query.searchQuery

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
          <Box w="200px" as="a" href="/peneliti/dashboard">
            <Image src="/meetry-eric-logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <SearchBarInput
            defaultValue={defaultValue}
            placeholder="Cari peneliti, mitra, atau account officer disini"
            onKeyDown={handleSearchInput}
          ></SearchBarInput>
          <Flex align="center" justify="center">
            <NavLink text="Beranda" href="/eric/dashboard" mr="32px"></NavLink>
            <NavLink text="Kolaborasi Saya" href="/eric/kolaborasi" mr="32px"></NavLink>
            <Link onClick={onOpen}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavERIC
