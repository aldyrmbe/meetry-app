import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  HStack,
  Text,
  Link,
  useToast,
  Button
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useForm, SubmitHandler, FieldError, FieldErrors, UseFormRegister } from "react-hook-form"
import { axiosInstance } from "src/service/axios"
import { showToast } from "src/service/toast"
import { emailValidation, passwordValidation } from "src/utils/input-validation/validation"
import { EmailInput, PasswordInput } from "@components/input/MeetryInput"
import { useState } from "react"
import { getRoleMapping, User } from "src/service/user"

interface LoginRequest {
  email: string
  password: string
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({ mode: "onChange" })
  const [isSending, setSending] = useState<boolean>(false)
  const router = useRouter()
  const toast = useToast()

  const onSubmit = handleSubmit((data: LoginRequest) => {
    setSending((prevState) => !prevState)
    axiosInstance
      .post<User>("/backend/user/login", data)
      .then((res) => {
        setSending((prevState) => !prevState)
        const role = res.data.role
        if (role == "ACCOUNT_OFFICER") {
          router.push(`/accountofficer/kolaborasi`)
        } else {
          router.push(`/${getRoleMapping(role)}/dashboard`)
        }
      })
      .catch((err) => {
        setSending((prevState) => !prevState)
        if (err.response.status >= 500) {
          showToast(toast, {
            title: "Server sedang bermasalah",
            description: "Silakan coba beberapa saat lagi.",
            status: "error"
          })
        } else {
          showToast(toast, {
            title: "Informasi akun salah!",
            description: err.response.data.message,
            status: "error"
          })
        }
      })
  })

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <Center mt="28px">
          <ModalHeader fontSize="2xl" fontWeight="bold">
            Masuk
          </ModalHeader>
        </Center>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody px="40px">
          <form onSubmit={onSubmit}>
            <EmailInput
              fieldName="email"
              register={register}
              label="Email"
              placeholder="Email"
              validation={emailValidation}
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
            <Button
              type="submit"
              mt="88px"
              colorScheme="teal"
              w="100%"
              mr={3}
              isLoading={isSending}
              loadingText="Mengirim..."
            >
              Lanjutkan
            </Button>
          </form>
          <Center my="20px">
            <HStack>
              <Text color="gray.500">Belum punya akun?</Text>
              <Link href="/register" color="teal" fontWeight="bold">
                Bergabung
              </Link>
            </HStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default LoginModal
