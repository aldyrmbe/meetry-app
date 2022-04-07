import { Flex, FlexProps } from "@chakra-ui/react"

const Container = (props: FlexProps) => {
  const { children, ...rest } = props
  return (
    <Flex
      p={props.p ?? "32px 40px"}
      minH={props.minH ?? "calc(100vh - 80px)"}
      mt={props.mt ?? "80px"}
      backgroundColor="#FAFAFA"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Container
