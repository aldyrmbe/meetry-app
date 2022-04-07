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
  Select,
  FormLabel,
  FormHelperText,
  InputLeftElement,
  InputProps
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { UseFormRegister, FieldValues, RegisterOptions, FieldErrors, UseFormWatch, Path } from "react-hook-form"
import React, { useState } from "react"

interface DefaultInputProps<TFormValues extends FieldValues> extends InputProps {
  fieldName: Path<TFormValues>
  register: UseFormRegister<TFormValues>
  label?: string
  validation?: RegisterOptions
  errors?: FieldErrors
}

export const EmailInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps<TFormValues>) => {
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

export const PasswordInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps<TFormValues>) => {
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

export const TextInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps<TFormValues>) => {
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

export const NumberInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps<TFormValues>) => {
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

export const DateInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: DefaultInputProps<TFormValues>) => {
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

interface TextAreaProps<TFormValues extends FieldValues> extends DefaultInputProps<TFormValues> {
  helperText?: string
}

export const TextArea = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt,
  helperText
}: TextAreaProps<TFormValues>) => {
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

interface FileInputProps<TFormValues extends FieldValues> extends DefaultInputProps<TFormValues> {
  watch: UseFormWatch<TFormValues>
}

export const FileInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  watch,
  label,
  placeholder,
  validation,
  errors,
  mt
}: FileInputProps<TFormValues>) => {
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
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface SelectOptions {
  value: string
  text: string
}

interface SelectInputProps<TFormValues extends FieldValues> extends DefaultInputProps<TFormValues> {
  options: SelectOptions[]
}

export const SelectInput = <TFormValues extends FieldValues>({
  options,
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  mt
}: SelectInputProps<TFormValues>) => {
  let error = errors?.[fieldName]?.message
  return (
    <FormControl isInvalid={Boolean(error)} mt={mt ?? "32px"}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Select id={fieldName} placeholder={placeholder} {...register(fieldName, validation)} backgroundColor="white">
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

interface TextIconInputProps<TFormValues extends FieldValues> extends DefaultInputProps<TFormValues> {
  icon: React.ReactNode
}

export const TextIconInput = <TFormValues extends FieldValues>({
  fieldName,
  register,
  label,
  placeholder,
  validation,
  errors,
  icon,
  mt
}: TextIconInputProps<TFormValues>) => {
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
