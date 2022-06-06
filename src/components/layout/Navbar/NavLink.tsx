import { Box, Flex, Link, LinkProps, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import NextLink from "next/link"

interface NavLinkProps {
  text: string
  path?: string
  hasBadge?: boolean
  mr?: string
  href: string
}

const NavLink = ({ text, hasBadge, href, path, mr }: NavLinkProps) => {
  const activeLinkProps = {
    color: "teal",
    fontWeight: "700"
  }

  const router = useRouter()
  const pathName = router.asPath
  path = path ? path : href
  const color = pathName.includes(path!) ? activeLinkProps.color : ""
  const fontWeight = pathName.includes(path!) ? activeLinkProps.fontWeight : ""

  if (pathName.includes("/dashboard")) {
    hasBadge = false
  }

  return (
    <Flex align="center" justify="start" mr={mr} gap="4px">
      {/* <Link color={color} href={href} fontWeight={fontWeight} whiteSpace="nowrap" {...rest}>
        {text}
      </Link> */}
      <NextLink href={href}>
        <Text
          cursor="pointer"
          _hover={{
            color: "#2C7A7B"
          }}
          color={color}
          fontWeight={fontWeight}
          whiteSpace="nowrap"
        >
          {text}
        </Text>
      </NextLink>
      {hasBadge && <Box h="8px" w="8px" backgroundColor="red.500" borderRadius="full" />}
    </Flex>
  )
}

export default NavLink
