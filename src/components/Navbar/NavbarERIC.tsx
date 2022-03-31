/* eslint-disable react/no-children-prop */
import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Link } from "@chakra-ui/react"
import NavWrapper from "@components/Navbar/NavWrapper"
import NavLink from "@components/Navbar/NavLink"
import { getRoleBasedPath } from "@lib/utils/basePath"
import { SearchIcon } from "@chakra-ui/icons"
import { KeyboardEvent } from "react"
import { useRouter } from "next/router"

const NavbarERIC = () => {
  const router = useRouter()

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
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="text"
              placeholder="Cari peneliti, mitra, atau account officer di sini"
              onKeyDown={handleSearchInput}
            />
          </InputGroup>
          <Flex align="center" justify="center">
            <NavLink
              text="Beranda"
              href={getRoleBasedPath("eric", "/dashboard")}
              mr="32px"
            ></NavLink>
            <NavLink text="Kolaborasi Saya" href="/about" path="/about" mr="32px"></NavLink>
            <Link>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavbarERIC
