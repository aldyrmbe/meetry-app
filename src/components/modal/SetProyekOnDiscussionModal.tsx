import { GetListUsernamesApiResponse } from "@/types/api-response/get-list-usernames"
import { KebutuhanProyek, ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { BaseResponse } from "@/types/base"
import { SearchIcon } from "@chakra-ui/icons"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import { AsyncSelectInput, DisabledInput, TextInput } from "@components/input/MeetryInput"
import { requiredValidation } from "@utils/input-validation/validation"
import { debounce } from "lodash"
import { useRouter } from "next/router"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { axiosInstance } from "src/service/axios"

type SetProyekOnDiscussionModalType = {
  isOpen: boolean
  onClose: () => void
  proyekData: ProyekDetailApiResponseData
  proyekId: string
}

type SetProyekOnDiscussionFormValues = {
  accountOfficer: string
  whatsappGroupLink: string
  partisipanValue: {
    value: string
  }[]
}

const SetProyekOnDiscussionModal = ({ proyekData, isOpen, onClose, proyekId }: SetProyekOnDiscussionModalType) => {
  const defaultPartisipanValue = proyekData.kebutuhanProyek.map((item) => {
    return {
      value: ""
    }
  })
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<SetProyekOnDiscussionFormValues>({
    mode: "onChange",
    defaultValues: {
      partisipanValue: defaultPartisipanValue
    }
  })
  const { fields } = useFieldArray({ control, name: "partisipanValue" })
  const [isSending, setSending] = useState<boolean>(false)

  const {
    pemohon,
    overviewProyek: { partisipan }
  } = proyekData

  const getPemohonName = () => {
    if (pemohon == "PENELITI") {
      return partisipan.peneliti[0].nama
    }
    return partisipan.mitra[0].nama
  }

  const getLabel = () => {
    return pemohon.charAt(0) + pemohon.slice(1).toLowerCase()
  }

  const getReversedLabel = () => {
    if (pemohon == "MITRA") {
      return "Peneliti"
    }
    return "Mitra"
  }

  const _fetchAccountOfficersOptions = (inputValue: string, callback: any) => {
    axiosInstance
      .get<GetListUsernamesApiResponse>(`/backend/user/getListUsernames?role=ACCOUNT_OFFICER&query=${inputValue}`)
      .then((res) => {
        callback(res.data.data)
      })
  }

  const fetchAccountOfficersOptions = debounce(_fetchAccountOfficersOptions, 500)

  const _fetchMitraOptions = (inputValue: string, callback: any) => {
    axiosInstance
      .get<GetListUsernamesApiResponse>(`/backend/user/getListUsernames?role=MITRA&query=${inputValue}`)
      .then((res) => {
        callback(res.data.data)
      })
  }

  const fetchMitraOptions = debounce(_fetchMitraOptions, 500)

  const _fetchPenelitiOptions = (inputValue: string, callback: any) => {
    axiosInstance
      .get<GetListUsernamesApiResponse>(`/backend/user/getListUsernames?role=PENELITI&query=${inputValue}`)
      .then((res) => {
        callback(res.data.data)
      })
  }

  const fetchPenelitiOptions = debounce(_fetchPenelitiOptions, 500)

  const onSubmit = handleSubmit((data) => {
    setSending(true)
    const partisipan = data.partisipanValue.map((partisipanObj) => partisipanObj.value)
    const requestBody = {
      accountOfficer: data.accountOfficer,
      partisipan,
      whatsappGroupLink: data.whatsappGroupLink
    }
    axiosInstance.put<BaseResponse>(`/backend/proyek/${proyekId}/setOnDiscussion`, requestBody).then((response) => {
      setSending(false)
      router.reload()
    })
  })

  return (
    <Modal blockScrollOnMount size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="700" p="32px 32px 0 32px">
          Masukkan Nama Mitra & Account Officer
        </ModalHeader>
        <ModalCloseButton mt="24px" mr="16px"></ModalCloseButton>
        <form onSubmit={onSubmit}>
          <ModalBody p="0 32px 32px 32px">
            <DisabledInput
              fieldName="peneliti"
              label={getLabel()}
              placeholder={getPemohonName()}
              leftIcon={<SearchIcon color="gray.400" />}
            />
            <AsyncSelectInput
              control={control}
              fieldName="accountOfficer"
              label="Masukkan nama Account Officer"
              placeholder="Pilih salah satu"
              loadOptions={fetchAccountOfficersOptions}
              rules={requiredValidation}
            />
            {fields.map((field, index) => (
              <AsyncSelectInput
                key={field.id}
                label={`${getReversedLabel()} kebutuhan ${index + 1}`}
                placeholder="Pilih salah satu"
                fieldName={`partisipanValue.${index}.value`}
                control={control}
                rules={requiredValidation}
                loadOptions={pemohon == "MITRA" ? fetchPenelitiOptions : fetchMitraOptions}
              />
            ))}

            <TextInput
              fieldName="whatsappGroupLink"
              register={register}
              label="Link grup WhatsApp"
              placeholder="Masukkan link grup Whatsapp"
            />
          </ModalBody>
          <ModalFooter mb="20px">
            <PrimaryButton w="100%" type="submit" isDisabled={!isValid} isLoading={isSending}>
              Kirim
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default SetProyekOnDiscussionModal
