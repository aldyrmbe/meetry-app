import { AddAccountOfficerRequest } from "@/types/api-request/add-accountofficer-request"
import { BaseResponse } from "@/types/base"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  useToast
} from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { EmailInput, PasswordInput, TextInput } from "@components/input/MeetryInput"
import { passwordValidation, requiredValidation } from "@utils/input-validation/validation"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { axiosInstance } from "src/service/axios"

type AddAccountOfficerModalType = {
  isOpen: boolean
  onClose: () => void
}

const AddAccountOfficerModal = ({ isOpen, onClose }: AddAccountOfficerModalType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddAccountOfficerRequest>({ mode: "onChange" })
  const toast = useToast()
  const [isSending, setSending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    setErrorMessage(undefined)
    setSending(true)
    axiosInstance
      .post<BaseResponse>("/backend/user/addAccountOfficer", data)
      .then((response) => {
        setSending(false)

        router.reload()
      })
      .catch((error) => {
        setSending(false)
        setErrorMessage(error.response.data.message)
      })
  })

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="700" p="32px 32px 0 32px">
          Tambahkan Account Officer
        </ModalHeader>
        <ModalCloseButton mt="24px" mr="16px"></ModalCloseButton>
        <form onSubmit={onSubmit}>
          <ModalBody p="0 32px 32px 32px">
            <TextInput
              fieldName="name"
              register={register}
              label="Nama lengkap"
              placeholder="Nama lengkap"
              validation={requiredValidation}
              errors={errors}
            ></TextInput>
            <EmailInput
              fieldName="email"
              register={register}
              label="Email"
              placeholder="example@gmail.com"
              validation={requiredValidation}
              errors={errors}
            ></EmailInput>
            <PasswordInput
              fieldName="password"
              register={register}
              label="Password"
              placeholder="Password"
              validation={passwordValidation}
              errors={errors}
            ></PasswordInput>
            {errorMessage && <Text>{errorMessage}</Text>}
          </ModalBody>
          <ModalFooter mb="20px">
            <PrimaryButton type="submit" w="100%" isDisabled={!isValid} isLoading={isSending}>
              Simpan
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddAccountOfficerModal
