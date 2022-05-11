import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, IconButton, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

interface MenuCardProps {
  text: string
  href: string | undefined
  externalLink?: boolean
  openInNewTab?: boolean
}

const MenuCard = ({ text, href, externalLink, openInNewTab = false }: MenuCardProps) => {
  const router = useRouter()

  return (
    <Link href={href} target={openInNewTab ? "_blank" : ""} style={{ textDecoration: "none" }}>
      <Box
        cursor="pointer"
        w="100%"
        h="100%"
        boxShadow="base"
        _hover={{
          boxShadow: "xl",
          transition: "0.3s",
          transform: "scale(1.02)",
          border: "1px solid #A7BED7"
        }}
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
            {externalLink ? (
              <IconButton
                aria-label="next"
                icon={<ExternalLinkIcon w="16px" h="16px" />}
                borderRadius="full"
              ></IconButton>
            ) : (
              <IconButton
                aria-label="next"
                icon={<ChevronRightIcon w="16px" h="16px" />}
                borderRadius="full"
              ></IconButton>
            )}
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}

export default MenuCard
