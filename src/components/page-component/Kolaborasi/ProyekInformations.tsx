import { OverviewProyek } from "@/types/api-response/get-proyek-detail"
import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import LinkifyText from "@components/Linkify/LinkifyText"

type ProyekInformationsType = {
  data: OverviewProyek
}

const titleMapping: { [key: string]: string } = {
  periode: "Perkiraan periode proyek",
  bidang: "Bidang proyek",
  latarBelakang: "Latar belakang",
  tujuan: "Tujuan penelitian",
  sasaran: "Sasaran penelitian",
  output: "Output",
  kebermanfaatanProduk: "Kebermanfaatan produk",
  indikatorKesuksesan: "Indikator kesuksesan",
  tingkatKesiapan: "Tingkat kesiapan sudah mencapai",
  linkPendukung: "Dokumen pendukung (link)",
  dokumenPendukung: "Dokumen pendukung (file)",
  whatsappGroupLink: "Group Chat WhatsApp"
}

const DokumenPendukung = ({ link }: any) => {
  return (
    <Flex>
      <Text fontSize="lg">{link.nama}: &nbsp;</Text>
      <LinkifyText fontSize="lg" value={link.value}></LinkifyText>
    </Flex>
  )
}

const ProyekInformations = ({ data }: ProyekInformationsType) => {
  const { judul, partisipan, ...informations } = data
  const objectKeys = Object.entries(informations)
  const lastKey = objectKeys[objectKeys.length - 1][0]

  return (
    <>
      {objectKeys.map((object, index) => {
        const key = object[0]
        const value = object[1]
        const isLastKey = key == lastKey
        return (
          <Box key={`${key}-${index}`}>
            <Flex flexDir="column" pt="32px" pb={isLastKey ? "0" : "32px"} gap="8px">
              {value !== null && (
                <Text fontSize="md" color="gray.500">
                  {titleMapping[key]}
                </Text>
              )}
              {key !== "linkPendukung" && key !== "dokumenPendukung" && (
                <LinkifyText fontSize="lg" value={value}></LinkifyText>
              )}
              {key === "linkPendukung" && (
                <>
                  {value.map((link: any, index: number) => (
                    <DokumenPendukung key={`${index}-linkPendukung`} link={link}></DokumenPendukung>
                  ))}
                </>
              )}
              {key === "dokumenPendukung" && (
                <>
                  {value.map((link: any, index: number) => (
                    <DokumenPendukung key={`${index}-dokumenPendukung`} link={link}></DokumenPendukung>
                  ))}
                </>
              )}
            </Flex>
            {!isLastKey && <Divider borderWidth="1px"></Divider>}
          </Box>
        )
      })}
    </>
  )
}

export default ProyekInformations
