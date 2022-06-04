import { Box, Flex, Image, Spacer, useDisclosure } from "@chakra-ui/react"
import LoginModal from "@components/modal/LoginModal"
import PrimaryButton from "@components/button/PrimaryButton"
import NavWrapper from "./NavWrapper"
import NonLoginNavbarLink from "./NonLoginNavbarLink"

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
            <NonLoginNavbarLink text="Beranda" href="/" mr="60px" />
            <NonLoginNavbarLink text="Manfaat" href="/#manfaat" mr="60px" />
            <NonLoginNavbarLink text="Cara Kerja" href="/#carakerja" mr="60px" />
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
