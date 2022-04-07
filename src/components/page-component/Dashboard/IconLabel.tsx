import { Text } from "@chakra-ui/react"
import React from "react"

interface IconLabelProps {
  children: React.ReactNode
}

const IconLabel = ({ children }: IconLabelProps) => {
  return (
    <Text fontSize="lg" fontWeight="medium" color="blackAlpha.700">
      {children}
    </Text>
  )
}

export default IconLabel
