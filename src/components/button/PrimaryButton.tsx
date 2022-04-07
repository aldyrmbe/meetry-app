import { Button, ButtonProps, LinkProps } from "@chakra-ui/react"

const PrimaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props
  return (
    <Button colorScheme="teal" {...rest}>
      {children}
    </Button>
  )
}

export default PrimaryButton
