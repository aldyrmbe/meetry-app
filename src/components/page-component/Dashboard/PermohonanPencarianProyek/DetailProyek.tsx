import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Spacer, Button, Text, Box, Divider, Center, Spinner } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import LinkifyText from "@components/Linkify/LinkifyText"
import useDetailProyek from "src/hooks/useDetailProyek"

interface DetailProyekProps {
  proyekId: string | undefined
  setProyekId: (proyekId: string | undefined) => void
}

const DetailProyek = ({ proyekId, setProyekId }: DetailProyekProps) => {
  const { detailProyek, isLoading } = useDetailProyek(proyekId)
  return (
    <>
      <Flex align="center" gap="16px">
        <ArrowBackIcon boxSize="25px" cursor="pointer" onClick={() => setProyekId(undefined)}></ArrowBackIcon>
        <Text fontSize="xl" fontWeight="semibold">
          Detail Proyek
        </Text>
        <Spacer></Spacer>
        <Button variant="outline" p="6px 12px" size="sm">
          Simpan sebagai PDF
        </Button>
      </Flex>
      <Box pt="32px">
        {isLoading ? (
          <Center>
            <Spinner></Spinner>
          </Center>
        ) : (
          <>
            {detailProyek.map((data, index) => (
              <Box key={index}>
                <Poin data={data}></Poin>
                <Divider my="32px" borderWidth="1.5px" backgroundColor="gray.100"></Divider>
              </Box>
            ))}
            <PrimaryButton w="100%">Masukkan Nama Mitra</PrimaryButton>
          </>
        )}
      </Box>
    </>
  )
}

interface PoinProps {
  data: {
    label: string
    value: string
  }
}

const Poin = ({ data }: PoinProps) => {
  const { label, value } = data

  return (
    <Box>
      <Text color="gray.500" fontSize="md">
        {label}
      </Text>
      <Text mt="8px" fontSize="lg">
        <LinkifyText value={value}></LinkifyText>
      </Text>
    </Box>
  )
}

export default DetailProyek
