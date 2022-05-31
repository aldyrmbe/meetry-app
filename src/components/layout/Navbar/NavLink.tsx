import { Box, Flex, Link, LinkProps, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface NavLinkProps extends LinkProps {
  text: string
  path?: string
  hasBadge?: boolean
  mr?: string
}

const NavLink = ({ text, hasBadge, href, path, mr, ...rest }: NavLinkProps) => {
  const activeLinkProps = {
    color: "teal",
    fontWeight: "700"
  }

  const router = useRouter()
  const pathName = router.asPath
  path = path ? path : href
  const color = pathName === path ? activeLinkProps.color : ""
  const fontWeight = pathName === path ? activeLinkProps.fontWeight : ""

  return (
    <Flex align="center" justify="start" mr={mr} gap="4px">
      <Link color={color} href={href} fontWeight={fontWeight} whiteSpace="nowrap" {...rest}>
        {text}
      </Link>
      {hasBadge && <Box h="8px" w="8px" backgroundColor="red.500" borderRadius="full" />}
    </Flex>
  )
}

export default NavLink
