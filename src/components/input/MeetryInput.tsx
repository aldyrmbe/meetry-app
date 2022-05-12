/* eslint-disable react/no-children-prop */
import {
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  InputGroup,
  InputRightElement,
  Flex,
  Text,
  InputRightAddon,
  FormLabel,
  FormHelperText,
  InputLeftElement,
  InputProps,
  Box
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Controller } from "react-hook-form"
import React, { useState } from "react"
import { AsyncSelect, CreatableSelect, Select } from "chakra-react-select"

interface DefaultInputProps extends InputProps {
  fieldName: any
  register: any
  label?: string
  validation?: any
  errors?: any
}

export const EmailInput = ({ fieldName, register, label, placeholder, validation, errors, mt }: DefaultInputProps) => {
  let error = errors?.[fieldName]?.message

  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="email"
        placeholder={placeholder}
        {...register(fieldName, validation)}
        backgroundColor="white"
      ></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const PasswordInput = ({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = (): void => setShowPassword(!showPassword)
  let error = errors?.[fieldName]?.message
  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={fieldName}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(fieldName, validation)}
          backgroundColor="white"
        />
        <InputRightElement>
          {showPassword ? (
            <ViewOffIcon cursor="pointer" onClick={handleShowPassword}></ViewOffIcon>
          ) : (
            <ViewIcon cursor="pointer" onClick={handleShowPassword}></ViewIcon>
          )}
        </InputRightElement>
      </InputGroup>
      <FormHelperText>Minimal 8 karakter</FormHelperText>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const TextInput = ({ fieldName, register, label, placeholder, validation, errors, mt }: DefaultInputProps) => {
  let error = errors?.[fieldName]?.message

  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="text"
        placeholder={placeholder}
        {...register(fieldName, validation)}
        backgroundColor="white"
      ></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const DisabledInput = ({
  fieldName,
  label,
  leftIcon,
  placeholder,
  mt
}: {
  fieldName: string
  label: string
  placeholder: string
  leftIcon?: React.ReactNode
  mt?: string
}) => {
  return (
    <FormControl mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <InputGroup>
        {leftIcon && <InputLeftElement pointerEvents="none" children={leftIcon} />}
        <Input
          id={fieldName}
          type="text"
          _placeholder={{ color: "gray.800" }}
          placeholder={placeholder}
          isDisabled
          backgroundColor="gray.100"
        ></Input>
      </InputGroup>
    </FormControl>
  )
}

export const NumberInput = ({ fieldName, register, label, placeholder, validation, errors, mt }: DefaultInputProps) => {
  let error = errors?.[fieldName]?.message

  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="number"
        placeholder={placeholder}
        {...register(fieldName, validation)}
        backgroundColor="white"
      ></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const DateInput = ({ fieldName, register, label, placeholder, validation, errors, mt }: DefaultInputProps) => {
  let error = errors?.[fieldName]?.message
  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Input
        id={fieldName}
        type="date"
        placeholder={placeholder}
        {...register(fieldName, validation)}
        backgroundColor="white"
      ></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface TextAreaProps extends DefaultInputProps {
  helperText?: string
}

export const TextArea = ({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt,
  helperText
}: TextAreaProps) => {
  let error = errors?.[fieldName]?.message
  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Textarea
        id={fieldName}
        placeholder={placeholder}
        {...register(fieldName, validation)}
        resize="none"
        backgroundColor="white"
      ></Textarea>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface FileInputProps extends DefaultInputProps {
  watch: any
  helperText?: string
}

export const FileInput = ({
  fieldName,
  register,
  watch,
  label,
  placeholder,
  validation,
  errors,
  helperText,
  mt
}: FileInputProps) => {
  const watchField = watch(fieldName)
  let error = errors?.[fieldName]?.message
  return (
    <FormControl mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <InputGroup id={fieldName} backgroundColor="white" pos="relative">
        <Flex w="100%" whiteSpace="nowrap" px={4} align="center" borderWidth={1} borderLeftRadius="md">
          {!watchField?.[0] && (
            <Text color="blackAlpha.500" fontWeight="500">
              {placeholder}
            </Text>
          )}
          {watchField?.[0] && watchField[0].name}
          <Input type="file" w="100%" opacity={0} pos="absolute" inset={0} {...register(fieldName, validation)} />
        </Flex>
        <InputRightAddon children={"Unggah File"}></InputRightAddon>
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface TextIconInputProps extends DefaultInputProps {
  icon: React.ReactNode
}

export const TextIconInput = ({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  icon,
  mt
}: TextIconInputProps) => {
  let error = errors?.[fieldName]?.messages
  return (
    <FormControl mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={icon} />
        <Input id="dokumenPendukung" {...register(fieldName, validation)} type="text" placeholder={placeholder}></Input>
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

type AsyncSelectInputProps = {
  control: any
  fieldName: string
  label: string
  placeholder: string
  rules: any
  loadOptions: any
}

export const AsyncSelectInput = ({
  control,
  fieldName,
  label,
  placeholder,
  rules,
  loadOptions
}: AsyncSelectInputProps) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field }) => {
        return (
          <FormControl mt="32px">
            <FormLabel>{label}</FormLabel>
            <Box backgroundColor="white">
              <AsyncSelect
                instanceId={fieldName}
                loadOptions={loadOptions}
                onChange={(e: any) => {
                  field.onChange(e.value)
                }}
                placeholder={placeholder}
                hideSelectedOptions={false}
              ></AsyncSelect>
            </Box>
          </FormControl>
        )
      }}
    ></Controller>
  )
}

interface SelectOptions {
  label: string
  value: string
}

interface SelectInputProps {
  control: any
  fieldName: string
  label: string
  placeholder: string
  rules?: any
  options?: SelectOptions[] | any
  defaultValue?: any[]
  defaultSelectValue?: SelectOptions[] | any
}

export const SelectInput = ({ control, fieldName, label, placeholder, rules, options }: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        let errorMessage = error?.message
        return (
          <FormControl isInvalid={Boolean(errorMessage)} mt="32px">
            <FormLabel>{label}</FormLabel>
            <Box backgroundColor="white">
              <Select
                instanceId={fieldName}
                onChange={(e: any) => {
                  field.onChange(e.value)
                }}
                options={options}
                placeholder={placeholder}
                hideSelectedOptions={false}
              ></Select>
            </Box>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
        )
      }}
    ></Controller>
  )
}

export const MultiSelectInput = ({ control, fieldName, label, placeholder, rules, options }: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        let errorMessage = error?.message
        return (
          <FormControl isInvalid={Boolean(errorMessage)} mt="32px">
            <FormLabel>{label}</FormLabel>
            <Box backgroundColor="white">
              <CreatableSelect
                isMulti
                instanceId={fieldName}
                onChange={(e: any) => {
                  field.onChange(e.map((object: any) => object.value))
                }}
                options={options}
                placeholder={placeholder}
                hideSelectedOptions={false}
              ></CreatableSelect>
            </Box>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
        )
      }}
    ></Controller>
  )
}

export const CustomMultiSelectInput = ({
  control,
  fieldName,
  label,
  placeholder,
  rules,
  options,
  defaultValue,
  defaultSelectValue
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        let errorMessage = error?.message
        return (
          <FormControl isInvalid={Boolean(errorMessage)} mt="32px">
            <FormLabel>{label}</FormLabel>
            <Box backgroundColor="white">
              <CreatableSelect
                isMulti
                instanceId={fieldName}
                onChange={(e: any) => {
                  field.onChange(e.map((object: any) => object.value))
                }}
                options={options}
                placeholder={placeholder}
                hideSelectedOptions={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                  NoOptionsMessage: () => null
                }}
                formatCreateLabel={(input) => `Tambah "${input}"`}
                defaultValue={defaultSelectValue}
              ></CreatableSelect>
            </Box>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
        )
      }}
    ></Controller>
  )
}
