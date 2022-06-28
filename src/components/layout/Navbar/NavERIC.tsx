import { Box, Flex, Image, Text } from "@chakra-ui/react"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import NavLink from "@components/layout/Navbar/NavLink"
import { getRoleBasedPath } from "src/utils/basePath"
import { KeyboardEvent } from "react"
import { useRouter } from "next/router"
import SearchBarInput from "@components/input/SearchBarInput"
import Link from "next/link"

type NavERIC = {
  onOpen: () => void
}

const NavERIC = ({ onOpen }: NavERIC) => {
  const router = useRouter()
  const defaultValue = router.query.searchQuery

  const handleSearchInput = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement
      const searchQuery = input.value
      router.push(getRoleBasedPath("eric", `/search?searchUserQuery=${searchQuery}`))
    }
  }

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="32px" align="center">
          <Link href="/eric/dashboard">
            <Box cursor="pointer" w="200px">
              <Image src="/meetry-eric-logo.svg" alt="Meetry Logo"></Image>
            </Box>
          </Link>
          <SearchBarInput
            defaultValue={defaultValue}
            placeholder="Cari peneliti, mitra, atau account officer disini"
            onKeyDown={handleSearchInput}
          ></SearchBarInput>
          <Flex align="center" justify="center">
            <NavLink text="Beranda" href="/eric/dashboard" mr="32px"></NavLink>
            <NavLink text="Semua Kolaborasi" href="/eric/kolaborasi" mr="32px"></NavLink>
            <Text
              cursor="pointer"
              _hover={{
                color: "#2C7A7B"
              }}
              onClick={onOpen}
            >
              Logout
            </Text>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavERIC
