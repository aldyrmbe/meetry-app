import { Box, BoxProps } from "@chakra-ui/react"

const Container = (props: BoxProps) => {
  const { children, ...rest } = props
  return (
    <Box
      p={props.p ?? "32px 40px"}
      minH={props.minH ?? "calc(100vh - 80px)"}
      mt={props.mt ?? "80px"}
      backgroundColor="#FAFAFA"
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Container
