import { Box } from "@chakra-ui/react"
import Linkify from "linkify-react"
import { useRouter } from "next/router"

interface AppProps {
  value: string
}

const CustomLink = ({ value }: AppProps) => {
  const router = useRouter()
  return (
    <Box as="span" _hover={{ color: "blue.600" }} fontWeight="medium" color="blue.500">
      {value}
    </Box>
  )
}

const LinkifyText = ({ value }: AppProps) => {
  const formatLink = (value: any, type: any) => {
    return <CustomLink value={value}></CustomLink>
  }
  const options = { defaultProtocol: "https", target: "_blank", format: formatLink }

  return (
    <Linkify tagName="span" options={options}>
      {value}
    </Linkify>
  )
}

export default LinkifyText
