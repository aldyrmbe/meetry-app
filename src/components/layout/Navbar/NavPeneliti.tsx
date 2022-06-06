import { Box, Flex, Image, Text, Spacer } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import { useRealtimeNotification } from "@hooks/useRealtimeNotification"
import Link from "next/link"

type NavPenelitiType = {
  id: string
  onOpen: () => void
}

const NavPeneliti = ({ id, onOpen }: NavPenelitiType) => {
  const { hasNewNotification, error } = useRealtimeNotification(id)

  return (
    <nav>
      <NavWrapper>
        <Flex h="80px" gap="16px" align="center">
          <Link href="/peneliti/dashboard">
            <Box cursor="pointer">
              <Image src="/meetry-peneliti-logo.svg" alt="Meetry Logo"></Image>
            </Box>
          </Link>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink hasBadge={hasNewNotification} text="Beranda" href={`/peneliti/dashboard`} mr="32px"></NavLink>
            <NavLink text="Kolaborasi Saya" href={`/peneliti/kolaborasi`} mr="32px"></NavLink>
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

export default NavPeneliti
