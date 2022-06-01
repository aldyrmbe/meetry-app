import { BaseResponse } from "@/types/base"
import { AddIcon } from "@chakra-ui/icons"
import { Flex, Modal, ModalContent, ModalOverlay, ModalCloseButton, Heading, Button, Text } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { FileInput } from "@components/input/MeetryInput"
import { requiredValidation } from "@utils/input-validation/validation"
import { useRouter } from "next/router"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { axiosInstance } from "src/service/axios"

type ActivateProyekModalType = {
  proyekId: string
  isOpen: boolean
  onClose: () => void
}

type ActivateProyekFormValues = {
  files: any[]
}

const ActivateProyekModal = ({ proyekId, isOpen, onClose }: ActivateProyekModalType) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      files: [{ value: null }]
    },
    mode: "onChange"
  })
  const [isSending, setSending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const router = useRouter()

  const { fields: fileFields, append: appendFile, remove: removeFile } = useFieldArray({ control, name: "files" })

  const onSubmit = handleSubmit((data: ActivateProyekFormValues) => {
    setSending(true)
    setErrorMessage(false)
    const { files } = data
    const formData = new FormData()
    if (files) {
      if (files.filter((e) => e.value == null).length !== 1) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i].value[0])
        }
      }
    }
    axiosInstance
      .put<BaseResponse>(`/backend/proyek/${proyekId}/activate`, formData)
      .then((res) => {
        setSending(false)
        router.reload()
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setSending(false)
      })
  })

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="32px">
        <ModalCloseButton></ModalCloseButton>
        <Heading size="lg">Tambahkan Dokumen Kontrak</Heading>
        <form onSubmit={onSubmit}>
          {fileFields.map((field, index) => {
            return (
              <Flex key={field.id} w="100%" gap="32px">
                <FileInput
                  validation={requiredValidation}
                  fieldName={`files.${index}.value`}
                  register={register}
                  watch={watch}
                  label={`File ${index + 1}`}
                  placeholder="Pilih file"
                  errors={errors}
                  helperText="Format: .pdf"
                ></FileInput>
                {fileFields.length !== 1 && (
                  <PrimaryButton mt="65px" onClick={() => removeFile(index)}>
                    Hapus
                  </PrimaryButton>
                )}
              </Flex>
            )
          })}
          {errorMessage && (
            <Text mt="32px" color="red.500">
              {errorMessage}
            </Text>
          )}
          <Button
            w="100%"
            mt="32px"
            size="sm"
            leftIcon={<AddIcon w="10px" mr="8px"></AddIcon>}
            onClick={() => appendFile({ value: null })}
            variant="ghost"
          >
            Tambah File Baru
          </Button>
          <PrimaryButton
            isLoading={isSending}
            loadingText="Loading..."
            isDisabled={!isValid}
            mt="32px"
            w="100%"
            type="submit"
          >
            Selesai
          </PrimaryButton>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ActivateProyekModal
