import { Box, Flex, Image, Link, Spacer, useToast } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import NavWrapper from "@components/layout/Navbar/NavWrapper"
import { useRealtimeNotification } from "@hooks/useRealtimeNotification"
import { useRouter } from "next/router"
import handleLogout from "src/utils/handleLogout"

const NavPeneliti = ({ id }: { id: string }) => {
  const router = useRouter()
  const toast = useToast()
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
            <Link onClick={() => handleLogout(router, toast)}>Logout</Link>
          </Flex>
        </Flex>
      </NavWrapper>
    </nav>
  )
}

export default NavPeneliti
