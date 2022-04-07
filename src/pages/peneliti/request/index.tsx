import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Box, Text } from "@chakra-ui/react"
import KriteriaMitra from "@components/AjukanKolaborasiMitra/KriteriaMitra"
import OverviewProyek from "@components/AjukanKolaborasiMitra/OverviewProyek"
import AuthorizedPage from "@components/AuthorizedPage/AuthorizedPage"
import Container from "@components/layout/Container/BoxContainer"
import NavbarPeneliti from "@components/layout/Navbar/NavbarPeneliti"
import useSteps from "src/hooks/useSteps"
import authenticate from "src/service/auth"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { AjukanKolaborasiRequest } from "@/types/api-request/ajukankolaborasi"

export const getServerSideProps: GetServerSideProps = authenticate("peneliti")

const AjukanKolaborasi = () => {
  const { activeStep, nextStep, prevStep } = useSteps()
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors }
  } = useForm<AjukanKolaborasiRequest>({
    defaultValues: {
      linkPendukung: [{ value: null }],
      dokumenPendukung: [{ value: null }],
      kebutuhanProyek: [
        {
          kebutuhanProyek: "",
          bentukKolaborasi: "",
          bidangMitra: [""],
          penjelasanTambahan: ""
        }
      ]
    }
  })

  const connectorRef = useRef<HTMLDivElement>(null)
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
      <Head>
        <title>Meetry - Ajukan Pencarian Mitra</title>
      </Head>
      <NavbarPeneliti></NavbarPeneliti>
      <Container>
        <Flex align="center" mb="32px" gap="16px">
          <Box as="a" href="/peneliti/dashboard">
            <ArrowBackIcon w="23px" h="32px" />
          </Box>
          <Text fontSize="3xl" fontWeight="bold">
            Ajukan Pencarian Mitra
          </Text>
        </Flex>
        <Box w="70%" m="0 auto">
          <Flex ref={connectorRef} gap="32px">
            <Flex flexDir="column" w="50%" gap="16px">
              <Box backgroundColor={activeStep === 1 ? "teal.500" : "gray.200"} w="100%" h="4px"></Box>
              <Box>
                <Text fontSize="sm" color="teal.500" fontWeight="semibold">
                  STEP 1
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  Isi Overview Proyek yang Ingin Dikolaborasikan
                </Text>
              </Box>
            </Flex>
            <Flex flexDir="column" w="50%" gap="16px">
              <Box backgroundColor={activeStep === 2 ? "teal.500" : "gray.200"} w="100%" h="4px"></Box>
              <Box>
                <Text fontSize="sm" color="teal.500" fontWeight="semibold">
                  STEP 2
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  Isi Kebutuhan dan Kriteria Mitra yang Dicari
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box p="32px" boxShadow="base" mt="32px" backgroundColor="#FFF">
            <form onSubmit={onSubmit}>
              {activeStep === 1 && (
                <OverviewProyek
                  connectorRef={connectorRef}
                  register={register}
                  nextStep={nextStep}
                  errors={errors}
                  control={control}
                  watch={watch}
                ></OverviewProyek>
              )}
              {activeStep === 2 && (
                <KriteriaMitra
                  connectorRef={connectorRef}
                  register={register}
                  prevStep={prevStep}
                  errors={errors}
                  control={control}
                ></KriteriaMitra>
              )}
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AuthorizedPage(AjukanKolaborasi)
