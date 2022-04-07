import React from "react"
import { Box } from "@chakra-ui/react"

interface NavWrapperProps {
  children: React.ReactNode
}

const NavWrapper = ({ children }: NavWrapperProps) => {
  return (
    <Box
      top="0"
      position="fixed"
      h="80px"
      w="100%"
      zIndex="1000"
      backgroundColor="white"
      shadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      px="40px"
    >
      {children}
    </Box>
  )
}

export default NavWrapper
