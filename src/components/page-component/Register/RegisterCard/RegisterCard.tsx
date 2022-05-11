import { ArrowBackIcon, CheckCircleIcon, InfoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, HStack, Icon, Text } from "@chakra-ui/react"

interface RegisterCardProps {
  type: "peneliti" | "mitra"
  handleClick: () => void
  isSelected: boolean
}

const RegisterCard = ({ type, handleClick, isSelected }: RegisterCardProps) => {
  const detail = {
    peneliti: {
      title: "Peneliti",
      description: "Kembangkan profil Anda dan dapatkan mitra yang tepat"
    },
    mitra: {
      title: "Mitra",
      description: "Temukan peneliti yang andal dan cocok untuk proyek Anda"
    }
  }

  return (
    <Box
      onClick={handleClick}
      cursor="pointer"
      mb="32px"
      p="22px"
      backgroundColor="#FFFFFF"
      filter="drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))"
    >
      <Flex mb="26px" justifyContent="space-between">
        <HStack spacing="21px">
          <Icon w="24px" h="24px">
            <path
              d="M20 22H4V20C4 18.6739 4.52678 17.4021 5.46447 16.4645C6.40215 15.5268 7.67392 15 9 15H15C16.3261 15 17.5979 15.5268 18.5355 16.4645C19.4732 17.4021 20 18.6739 20 20V22ZM12 13C11.2121 13 10.4319 12.8448 9.7039 12.5433C8.97595 12.2417 8.31451 11.7998 7.75736 11.2426C7.20021 10.6855 6.75825 10.0241 6.45672 9.2961C6.15519 8.56815 6 7.78793 6 7C6 6.21207 6.15519 5.43185 6.45672 4.7039C6.75825 3.97595 7.20021 3.31451 7.75736 2.75736C8.31451 2.20021 8.97595 1.75825 9.7039 1.45672C10.4319 1.15519 11.2121 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7C18 8.5913 17.3679 10.1174 16.2426 11.2426C15.1174 12.3679 13.5913 13 12 13V13Z"
              fill="#2D3748"
            />
          </Icon>
          <Text fontSize="lg" fontWeight="bold">
            {detail[type].title}
          </Text>
        </HStack>
        {isSelected && <CheckCircleIcon w="24px" h="24px" color="teal.500"></CheckCircleIcon>}
      </Flex>
      <HStack w="654px" backgroundColor="blue.100" borderRadius="6px" p="12px 16px">
        <InfoIcon w="24px" h="24px" color="blue.500" mr="12px"></InfoIcon>
        <Text fontSize="md">{detail[type].description}</Text>
      </HStack>
    </Box>
  )
}

export default RegisterCard
