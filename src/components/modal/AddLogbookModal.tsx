import { AddLogbookRequest } from "@/types/api-request/add-logbook-request"
import { LogbookData } from "@/types/api-response/get-logbooks"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Text,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { CustomMultiSelectInput, DateInput, TextArea, TextInput } from "@components/input/MeetryInput"
import { requiredValidation } from "@utils/input-validation/validation"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { axiosInstance } from "src/service/axios"

type AddLogbookModalType = {
  isOpen: boolean
  onClose: () => void
  reFetchLogbooks: (proyekId: string, subFolderId: string) => void
}

const AddLogbookModal = ({ isOpen, onClose, reFetchLogbooks }: AddLogbookModalType) => {
  const router = useRouter()
  const proyekId = router.query.proyekId as string
  const subFolderId = router.query.subFolderId as string

  const [isSending, setSending] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddLogbookRequest>()

  const onSubmit = handleSubmit((formValues) => {
    setSending(true)
    let { waktu, ...rest } = formValues
    waktu = new Date(waktu).getTime()
    const requestBody = {
      waktu,
      ...rest
    }
    axiosInstance
      .post(`/backend/logbook/${proyekId}/${subFolderId}`, requestBody)
      .then((res) => {
        onClose()
        setSending(false)
        reFetchLogbooks(proyekId, subFolderId)
      })
      .catch((error) => {
        setSending(false)
      })
  })

  return (
    <Modal size="2xl" blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="32px">
        <ModalHeader fontSize="2xl" fontWeight="bold">
          Tambah Logbook
        </ModalHeader>
        <ModalCloseButton m="32px" />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <TextInput
              register={register}
              fieldName="judul"
              label="Judul kegiatan"
              placeholder="Judul kegiatan"
              validation={requiredValidation}
              errors={errors}
              mt="0"
            ></TextInput>
            <TextArea
              register={register}
              fieldName="deskripsi"
              label="Deskripsi"
              placeholder="Contoh: Mengadakan pertemuan terkait pembahasan Rancangan Anggaran Biaya proyek yang akan dikerjakan"
              validation={requiredValidation}
              errors={errors}
            ></TextArea>
            <Flex mt="32px" w="100%" align="center">
              <Text w="45%" mt="10px" color="blackAlpha.600" fontSize="lg" fontWeight="medium">
                Waktu Kegiatan
              </Text>
              <DateInput register={register} fieldName="waktu" mt="0"></DateInput>
            </Flex>
            <CustomMultiSelectInput
              control={control}
              fieldName="tags"
              label="Tag"
              rules={requiredValidation}
              placeholder="Ketikkan beberapa tag"
            ></CustomMultiSelectInput>
          </ModalBody>

          <ModalFooter mt="32px">
            <PrimaryButton isLoading={isSending} type="submit" w="100%">
              Simpan
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddLogbookModal
