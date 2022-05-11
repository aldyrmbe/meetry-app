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
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { axiosInstance } from "src/service/axios"

type EditLogbookModalType = {
  isOpen: boolean
  onClose: () => void
  data: LogbookData
}

const EditLogbookModal = ({ isOpen, onClose, data }: EditLogbookModalType) => {
  const { proyekId, setSubFolderId, subFolderId } = useContext(KolaborasiPageContext)
  const [isSending, setSending] = useState<boolean>(false)

  const getDefaultTags = () => {
    return data.tags.map((tag) => {
      return {
        label: tag,
        value: tag
      }
    })
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddLogbookRequest>({
    defaultValues: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      waktu: new Date(data.waktu).toISOString().substring(0, 10)
    }
  })

  const onSubmit = handleSubmit((formValues) => {
    setSending(true)
    let { waktu, ...rest } = formValues
    waktu = new Date(waktu).getTime()
    const requestBody = {
      waktu,
      ...rest
    }
    axiosInstance
      .put(`/backend/logbook/${proyekId}/${data.id}`, requestBody)
      .then((res) => {
        setSubFolderId(undefined)
        setSubFolderId(subFolderId)
        onClose()
        setSending(false)
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
              defaultValue={data.judul}
            ></TextInput>
            <TextArea
              register={register}
              fieldName="deskripsi"
              label="Deskripsi"
              placeholder="Mengadakan pertemuan terkait pembahasan Rancangan Anggaran Biaya proyek yang akan dikerjakan"
              validation={requiredValidation}
              errors={errors}
              defaultValue={data.deskripsi}
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
              placeholder="Ketikkan beberapa tag"
              defaultValue={data.tags}
              defaultSelectValue={getDefaultTags()}
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

export default EditLogbookModal
