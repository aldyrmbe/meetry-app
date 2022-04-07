import React from "react"
import { Flex } from "@chakra-ui/react"

interface MenuHeaderProps {
  children: React.ReactNode
}

const MenuHeader = ({ children }: MenuHeaderProps) => {
  return (
    <Flex align="center" gap="10px">
      {children}
    </Flex>
  )
}

export default MenuHeader
