import { Box, Flex, Image, Text, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import Link from "next/link"
import { useRouter } from "next/router"

type NavAccountOfficerType = {
  onOpen: () => void
}

const NavAccountOfficer = ({ onOpen }: NavAccountOfficerType) => {
  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="16px" align="center">
          <Link href="/accountofficer/kolaborasi">
            <Box cursor="pointer">
              <Image src="/meetry-officer-logo.svg" alt="Meetry Logo"></Image>
            </Box>
          </Link>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink text="Proyek" href={`/accountofficer/kolaborasi`} mr="32px"></NavLink>
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

export default NavAccountOfficer
