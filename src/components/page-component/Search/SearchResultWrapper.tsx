import { Box } from "@chakra-ui/react"
import React from "react"

const SearchResultWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box mt="32px" p="20px" boxShadow="base" borderRadius="6px" backgroundColor="white">
      {children}
    </Box>
  )
}

export default SearchResultWrapper
