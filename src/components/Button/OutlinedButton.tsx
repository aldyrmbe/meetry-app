import { Button, ButtonProps, LinkProps } from "@chakra-ui/react"

const OutlinedButton = (props: ButtonProps) => {
  const { children, ...rest } = props
  return (
    <Button variant="outline" {...rest}>
      {children}
    </Button>
  )
}

export default OutlinedButton
