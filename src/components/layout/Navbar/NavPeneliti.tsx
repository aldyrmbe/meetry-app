import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import { useRealtimeNotification } from "@hooks/useRealtimeNotification"

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
          <Box as="a" href="/peneliti/dashboard">
            <Image src="/meetry-peneliti-logo.svg" alt="Meetry Logo"></Image>
          </Box>
          <Spacer></Spacer>
          <Flex align="center" justify="center">
            <NavLink hasBadge={hasNewNotification} text="Beranda" href={`/peneliti/dashboard`} mr="32px"></NavLink>
            <NavLink text="Kolaborasi Saya" href={`/peneliti/kolaborasi`} mr="32px"></NavLink>
            <Link onClick={onOpen}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavPeneliti
