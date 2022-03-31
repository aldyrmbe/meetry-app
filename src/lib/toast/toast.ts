import { UseToastOptions } from "@chakra-ui/react"

export const showToast = (toast: any, options: UseToastOptions) => {
  const { title, description, status, duration, isClosable } = options
  toast({
    title,
    position: "top",
    description,
    status,
    duration: duration ?? 5000,
    isClosable: isClosable ?? true
  })
}
