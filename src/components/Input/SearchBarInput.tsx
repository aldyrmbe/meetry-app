/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons"
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"

interface SearchBarInputProps {
  placeholder: string
  handleSearch: any
}

const SearchBarInput = ({ placeholder, handleSearch }: SearchBarInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
      <Input type="text" placeholder={placeholder} onKeyDown={handleSearch} />
    </InputGroup>
  )
}

export default SearchBarInput
