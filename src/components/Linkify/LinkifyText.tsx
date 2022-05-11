import { Box, Text } from "@chakra-ui/react"
import Linkify from "linkify-react"
import { useRouter } from "next/router"

interface AppProps {
  mt?: string
  fontSize?: string
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

const LinkifyText = ({ fontSize, value, mt }: AppProps) => {
  const formatLink = (value: any, type: any) => {
    return <CustomLink value={value}></CustomLink>
  }
  const options = { defaultProtocol: "https", target: "_blank", format: formatLink }

  return (
    <Linkify tagName="span" options={options}>
      <Text mt={mt} fontSize={fontSize}>
        {value}
      </Text>
    </Linkify>
  )
}

export default LinkifyText
