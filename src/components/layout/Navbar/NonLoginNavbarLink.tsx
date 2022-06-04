import { Flex, Link, LinkProps } from "@chakra-ui/react"
import { String } from "lodash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface NonLoginNavbarLinkProps extends LinkProps {
  text: string
  mr?: string
  href: string
}

const NonLoginNavbarLink = ({ text, href, mr, ...rest }: NonLoginNavbarLinkProps) => {
  const [color, setColor] = useState<string>("")
  const [fontWeight, setFontWeight] = useState<string>("")

  const router = useRouter()
  const pathName = router.asPath

  useEffect(() => {
    if (pathName == href) {
      setColor(activeLinkProps.color)
      setFontWeight(activeLinkProps.fontWeight)
    } else {
      setColor("")
      setFontWeight("")
    }
  }, [router])

  const activeLinkProps = {
    color: "teal",
    fontWeight: "700"
  }

  return (
    <Link color={color} href={href} fontWeight={fontWeight} whiteSpace="nowrap" mr={mr} {...rest}>
      {text}
    </Link>
  )
}

export default NonLoginNavbarLink
