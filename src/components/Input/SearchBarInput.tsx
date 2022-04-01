/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons"
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"

interface SearchBarInputProps {
  placeholder: string
  onChange?: any
  onKeyDown?: any
}

const SearchBarInput = ({ placeholder, onChange, onKeyDown }: SearchBarInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
      <Input type="text" placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} />
    </InputGroup>
  )
}

export default SearchBarInput
