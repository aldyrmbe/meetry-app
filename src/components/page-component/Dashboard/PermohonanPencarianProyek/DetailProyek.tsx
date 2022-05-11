import {
  Partisipan,
  Pendukung,
  ProyekDetailApiResponse,
  ProyekDetailApiResponseData
} from "@/types/api-response/get-proyek-detail"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Spacer, Button, Text, Box, Divider, VStack, StackDivider, useDisclosure, Link } from "@chakra-ui/react"
import PrimaryButton from "@components/button/PrimaryButton"
import LinkifyText from "@components/Linkify/LinkifyText"
import SetProyekOnDiscussionModal from "@components/modal/SetProyekOnDiscussionModal"
import { useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"

const scrollBarCSS = {
  "&::-webkit-scrollbar": {
    width: 0
  },
  "&::-webkit-scrollbar-track": {
    width: 0
  },
  "&::-webkit-scrollbar-thumb": {
    background: "white",
    borderRadius: 0
  }
}

const SectionTitle = ({ children, mt }: { children: React.ReactNode; mt?: string }) => {
  return (
    <Text mt={mt} fontSize="18px" fontWeight="bold" color="gray.900">
      {children}
    </Text>
  )
}

const Info = ({ title, text, isLink = false }: { title: string; text: any; isLink?: boolean }) => {
  return (
    <Box>
      <Text color="gray.500">{title}</Text>
      {isLink ? (
        <LinkifyText mt="8px" fontSize="lg" value={text}></LinkifyText>
      ) : (
        <Text fontSize="lg" mt="8px">
          {text}
        </Text>
      )}
    </Box>
  )
}

const InfoDokumenPendukung = ({ title, dokumenPendukung }: { title: string; dokumenPendukung: Pendukung[] }) => {
  return (
    <Box>
      <Text color="gray.500">{title}</Text>
      <Box mt="8px">
        {dokumenPendukung.map((item) => (
          <Flex key={item.value}>
            <Text fontSize="lg">{item.nama}: &nbsp;</Text>
            <LinkifyText fontSize="lg" value={item.value}></LinkifyText>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

const CustomDivider = () => {
  return <Divider mt="32px" borderWidth="3px" borderColor="gray.200" backgroundColor="gray.200"></Divider>
}

type DetailProyekType = {
  proyekId: string | undefined
  setProyekId: (proyekId: string | undefined) => void
}

const DetailProyek = ({ proyekId, setProyekId }: DetailProyekType) => {
  const [proyekData, setProyekData] = useState<ProyekDetailApiResponseData>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    if (proyekId) {
      axiosInstance.get<ProyekDetailApiResponse>(`/backend/proyek/${proyekId}`).then((response) => {
        const data = response.data.data
        console.log(data)
        setProyekData(data)
        setLoading(false)
      })
      setLoading(true)
    }
  }, [proyekId])

  const getPemohon = (pemohon: "PENELITI" | "MITRA", partisipan: Partisipan) => {
    if (pemohon === "PENELITI") {
      return <Info title="Peneliti" text={partisipan.peneliti[0].nama}></Info>
    }
    return <Info title="Mitra" text={partisipan.mitra[0].nama}></Info>
  }

  const getProfilPemohon = (pemohon: "PENELITI" | "MITRA", partisipan: Partisipan) => {
    if (pemohon === "PENELITI") {
      return <Info title="Profil lengkap peneliti" text={partisipan.peneliti[0].profilePageUrl} isLink></Info>
    }
    const mitraProfileUrl = `${window.location.origin}/profile${partisipan.mitra[0].profilePageUrl}`
    return <Info title="Profil lengkap mitra" text={mitraProfileUrl} isLink></Info>
  }

  return (
    <Box>
      <Flex align="center" gap="16px">
        <ArrowBackIcon boxSize="25px" cursor="pointer" onClick={() => setProyekId(undefined)}></ArrowBackIcon>
        <Text fontSize="xl" fontWeight="semibold">
          Detail Proyek
        </Text>
        <Spacer></Spacer>
        {proyekId && (
          <Link target="_blank" href={`/pdf?proyekId=${proyekId}`}>
            <Button variant="outline" p="6px 12px" size="sm">
              Simpan sebagai PDF
            </Button>
          </Link>
        )}
      </Flex>
      {proyekData && (
        <Box mt="32px" css={scrollBarCSS} maxH="calc(100vh - 340px)" overflowY="scroll">
          {/* Overview Proyek */}
          <SectionTitle>Overview proyek</SectionTitle>
          <VStack w="100%" align="flex-start" spacing="32px" mt="32px" divider={<StackDivider />}>
            {getPemohon(proyekData.pemohon, proyekData.overviewProyek.partisipan)}
            {getProfilPemohon(proyekData.pemohon, proyekData.overviewProyek.partisipan)}
            <Info title="Judul proyek" text={proyekData.overviewProyek.judul} />
            <Info title="Perkiraan periode proyek" text={proyekData.overviewProyek.periode} />
            <Info title="Bidang proyek" text={proyekData.overviewProyek.bidang} />
            <Info title="Latar belakang" text={proyekData.overviewProyek.latarBelakang} />
            <Info title="Tujuan penelitian" text={proyekData.overviewProyek.tujuan} />
            <Info title="Sasaran penelitian" text={proyekData.overviewProyek.sasaran} />
            <Info title="Output" text={proyekData.overviewProyek.output} />
            <Info title="Kebermanfaatan produk" text={proyekData.overviewProyek.kebermanfaatanProduk} />
            <Info title="Indikator kesuksesan" text={proyekData.overviewProyek.indikatorKesuksesan} />
            <Info title="Tingkat kesiapan sudah mencapai" text={proyekData.overviewProyek.tingkatKesiapan} />
            {proyekData.overviewProyek.linkPendukung && (
              <InfoDokumenPendukung
                title="Dokumen pendukung (link)"
                dokumenPendukung={proyekData.overviewProyek.linkPendukung!}
              ></InfoDokumenPendukung>
            )}
            {proyekData.overviewProyek.dokumenPendukung && (
              <InfoDokumenPendukung
                title="Dokumen pendukung (file)"
                dokumenPendukung={proyekData.overviewProyek.dokumenPendukung!}
              ></InfoDokumenPendukung>
            )}
          </VStack>
          <CustomDivider />
          {/* Kebutuhan Proyek */}
          <VStack w="100%" align="flex-start" spacing="32px" divider={<CustomDivider />}>
            {proyekData.kebutuhanProyek.map((kebutuhanProyek, index) => (
              <Box key={`kebutuhan-${index}`}>
                <SectionTitle mt="32px">Kebutuhan {index + 1}</SectionTitle>
                <VStack
                  key={`kebutuhan-${index}`}
                  w="100%"
                  align="flex-start"
                  spacing="32px"
                  mt="32px"
                  divider={<StackDivider />}
                >
                  <Info title="Kebutuhan-kebutuhan proyek" text={kebutuhanProyek.kebutuhanProyek} />
                  <Info title="Bentuk kolaborasi yang diharapkan" text={kebutuhanProyek.bentukKolaborasi} />
                  <Info title="Penjelasan tambahan" text={kebutuhanProyek.penjelasanTambahan} />
                </VStack>
              </Box>
            ))}
          </VStack>
          <PrimaryButton w="100%" mt="32px" onClick={onOpen}>
            Masukkan Nama Mitra & Account Officer
          </PrimaryButton>
          {proyekId && (
            <SetProyekOnDiscussionModal
              proyekData={proyekData}
              isOpen={isOpen}
              onClose={onClose}
              proyekId={proyekId}
            ></SetProyekOnDiscussionModal>
          )}
        </Box>
      )}
    </Box>
  )
}

export default DetailProyek
