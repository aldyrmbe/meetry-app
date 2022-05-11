import { Link, LinkProps } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface NavLinkProps extends LinkProps {
  text: string
  path?: string
}

const NavLink = ({ text, href, path, ...rest }: NavLinkProps) => {
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
    <Link color={color} href={href} fontWeight={fontWeight} whiteSpace="nowrap" {...rest}>
      {text}
    </Link>
  )
}

export default NavLink
