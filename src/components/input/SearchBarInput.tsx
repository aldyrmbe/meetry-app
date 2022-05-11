/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons"
import { InputGroup, InputLeftElement, Input, InputProps } from "@chakra-ui/react"

interface SearchBarInputProps extends InputProps {
  placeholder: string
  onChange?: any
  onKeyDown?: any
}

const SearchBarInput = ({ placeholder, onChange, onKeyDown, ...rest }: SearchBarInputProps) => {
  return (
    <InputGroup backgroundColor="white">
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
      <Input type="text" placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} {...rest} />
    </InputGroup>
  )
}

export default SearchBarInput
