import { Box, Flex, Image, Spacer, useDisclosure } from "@chakra-ui/react"
import NavLink from "@components/layout/Navbar/NavLink"
import LoginModal from "@components/modal/LoginModal"
import PrimaryButton from "@components/button/PrimaryButton"
import NavWrapper from "./NavWrapper"

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <nav>
        <NavWrapper>
          <Flex h="80px" align="center">
            <Box as="a" href="/" w="20%">
              <Image src="/logo.svg" alt="Meetry Logo"></Image>
            </Box>
            <Spacer></Spacer>
            <NavLink text="Beranda" href="/" path="/" mr="60px"></NavLink>
            <NavLink text="Tentang Kami" href="/about" path="/about" mr="60px"></NavLink>
            <PrimaryButton onClick={onOpen} variant="solid" p="8px 16px">
              Masuk
            </PrimaryButton>
          </Flex>
        </NavWrapper>
      </nav>

      {/* Log In Modal */}
      <LoginModal isOpen={isOpen} onClose={onClose}></LoginModal>
    </>
  )
}

export default Navbar
