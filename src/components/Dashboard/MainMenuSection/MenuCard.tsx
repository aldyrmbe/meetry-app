import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, IconButton } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface MenuCardProps {
  text: string
  href: string
}

const MenuCard = ({ text, href }: MenuCardProps) => {
  const router = useRouter()

  return (
    <Box
      cursor="pointer"
      onClick={() => {
        router.push(href)
      }}
      w="100%"
      h="100%"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      borderRadius="6px"
      p="32px"
      backgroundColor="white"
    >
      <Flex flexDir="column" gap="32px" h="100%">
        <Box backgroundColor="gray.100" h="100%" w="100%" borderRadius="6px"></Box>
        <Flex w="100%" justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold">
            {text}
          </Text>
          <IconButton
            aria-label="next"
            icon={<ChevronRightIcon w="16px" h="16px" />}
            borderRadius="full"
          ></IconButton>
        </Flex>
      </Flex>
    </Box>
  )
}

export default MenuCard
