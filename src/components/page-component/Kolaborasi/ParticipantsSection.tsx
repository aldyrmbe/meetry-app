import { DetailPartisipan, Partisipan } from "@/types/api-response/get-proyek-detail"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Flex, Text, Image, Link, Box, useFormControlProps } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import { Role } from "src/service/user"

type ParticipantsSectionType = {
  data: Partisipan
}

type MitraType = {
  mitra: DetailPartisipan
}

const Mitra = ({ mitra }: MitraType) => {
  return (
    <Flex align="center" gap="16px" mt="32px">
      <Image h="32px" w="32px" borderRadius="full" alt="Mitra" src={mitra.fotoProfil}></Image>
      <Text fontSize="lg">{mitra.nama} (Mitra)</Text>
      <Link href={`/profile${mitra.profilePageUrl}`} target="_blank">
        <OutlinedButton size="sm" rightIcon={<ExternalLinkIcon />}>
          Lihat Profil
        </OutlinedButton>
      </Link>
    </Flex>
  )
}

type PenelitiType = {
  peneliti: DetailPartisipan
}

const Peneliti = ({ peneliti }: PenelitiType) => {
  return (
    <Flex align="center" gap="16px" mt="32px">
      <Image h="32px" w="32px" borderRadius="full" alt="Mitra" src={peneliti.fotoProfil}></Image>
      <Text fontSize="lg">{peneliti.nama} (Peneliti)</Text>
      <Link target="_blank" href={peneliti.profilePageUrl}>
        <OutlinedButton rightIcon={<ExternalLinkIcon />} size="sm">
          Lihat Profil
        </OutlinedButton>
      </Link>
    </Flex>
  )
}

type AccountOfficerType = {
  accountOfficer: DetailPartisipan
}

const AccountOfficer = ({ accountOfficer }: AccountOfficerType) => {
  return (
    <Flex align="center" gap="16px" mt="32px">
      <Image h="32px" w="32px" borderRadius="full" alt="Mitra" src={accountOfficer.fotoProfil}></Image>
      <Text fontSize="lg">{accountOfficer.nama} (Account Officer)</Text>
    </Flex>
  )
}

const EmptyParticipant = ({ role }: { role: Role }) => {
  return (
    <Flex align="center" gap="16px" mt="32px">
      <Box w="32px" h="32px" borderRadius="full" backgroundColor="#C4C4C4"></Box>
      {role === "PENELITI" && <Text fontSize="lg">Belum ada Peneliti</Text>}
      {role === "MITRA" && <Text fontSize="lg">Belum ada Mitra</Text>}
      {role === "ACCOUNT_OFFICER" && <Text fontSize="lg">Belum ada Account Officer</Text>}
    </Flex>
  )
}

const ParticipantsSection = ({ data }: ParticipantsSectionType) => {
  return (
    <>
      {data.peneliti.length !== 0 ? (
        <>
          {data.peneliti.map((peneliti, index) => (
            <Peneliti key={index} peneliti={peneliti}></Peneliti>
          ))}
        </>
      ) : (
        <EmptyParticipant role="PENELITI"></EmptyParticipant>
      )}
      {data.mitra.length !== 0 ? (
        <>
          {data.mitra.map((mitra, index) => (
            <Mitra key={index} mitra={mitra}></Mitra>
          ))}
        </>
      ) : (
        <EmptyParticipant role="MITRA"></EmptyParticipant>
      )}
      {data.accountOfficer ? (
        <AccountOfficer accountOfficer={data.accountOfficer}></AccountOfficer>
      ) : (
        <EmptyParticipant role="ACCOUNT_OFFICER"></EmptyParticipant>
      )}
    </>
  )
}

export default ParticipantsSection
