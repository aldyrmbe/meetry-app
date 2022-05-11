import { StatusType } from "@/types/api-response/get-proyek-list"
import { Flex, Text } from "@chakra-ui/react"
import ExclamationIcon from "@components/icon/ExclamationIcon"
import { Role } from "src/service/user"

type DalamDiskusiAlertType = {
  role: Role
  pemohon: Role
  status: StatusType
}

const DalamDiskusiAlert = ({ role, pemohon, status }: DalamDiskusiAlertType) => {
  const penelitiAlertText =
    "Anda masih dalam tahap diskusi dengan Mitra. Jika Anda dan Mitra sepakat untuk melanjutkan proyek ini, kami akan mengubah statusnya menjadi “Aktif”. Namun jika mitra menolak, maka kami akan kembali mencarikan mitra untuk Anda"

  const mitraAlertText =
    "Anda masih dalam tahap diskusi dengan Peneliti. Jika Anda dan Peneliti sepakat untuk melanjutkan proyek ini, kami akan mengubah statusnya menjadi “Aktif”. Namun jika peneliti menolak, maka kami akan kembali mencarikan peneliti untuk Anda"

  const getAlertText = () => {
    if (pemohon === "PENELITI") return penelitiAlertText
    return mitraAlertText
  }

  return (
    <>
      {(role === "MITRA" || role === "PENELITI") && status === "DALAM_DISKUSI" && (
        <Flex
          backgroundColor="blue.100"
          borderRadius="6px"
          p="12px 16px"
          gap="12px"
          mb="32px"
          align="center"
          justify="space-between"
        >
          <ExclamationIcon></ExclamationIcon>
          <Text>{getAlertText()}</Text>
        </Flex>
      )}
    </>
  )
}

export default DalamDiskusiAlert
