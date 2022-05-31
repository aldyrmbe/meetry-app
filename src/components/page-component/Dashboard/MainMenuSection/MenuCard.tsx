import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, IconButton, Link, Image } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

interface MenuCardProps {
  text: string
  href: string | undefined
  externalLink?: boolean
  openInNewTab?: boolean
  isProfile?: boolean
}

const MenuCard = ({ text, href, externalLink, openInNewTab = false, isProfile = false }: MenuCardProps) => {
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
          <Flex align="center" justify="center" h="100%" w="100%" borderRadius="6px">
            <Image
              alt="Main menu"
              width="250px"
              height="230px"
              src={isProfile ? "/my-profile-illustration.webp" : "/ajukan-pencarian-illustration.webp"}
            ></Image>
          </Flex>
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
