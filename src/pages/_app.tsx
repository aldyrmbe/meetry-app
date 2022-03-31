import "../../styles/globals.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from "chakra-ui-steps"
import type { AppProps } from "next/app"

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif"
  },
  components: {
    Steps
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
