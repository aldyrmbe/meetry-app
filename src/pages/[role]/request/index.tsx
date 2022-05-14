import { ArrowBackIcon } from "@chakra-ui/icons"
import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react"
import KriteriaKerjasama from "@components/AjukanKolaborasiMitra/KriteriaKerjasama"
import OverviewProyek from "@components/AjukanKolaborasiMitra/OverviewProyek"
import Container from "@components/layout/Container/BoxContainer"
import useSteps from "src/hooks/useSteps"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { AjukanKolaborasiRequest } from "@/types/api-request/ajukankolaborasi"
import RequestProyekSuccessModal from "@components/modal/RequestProyekSuccessModal"
import { axiosInstance } from "src/service/axios"
import BaseResponse from "src/service/baseResponse"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import { Role } from "src/service/user"
import Error from "next/error"
import { customAuthenticate } from "src/service/auth"

export const getServerSideProps: GetServerSideProps = customAuthenticate(["peneliti", "mitra"])

const AjukanKolaborasi = ({ error, role }: { error: boolean; role: Role }) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { activeStep, nextStep, prevStep } = useSteps()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    getValues,
    formState: { errors }
  } = useForm<AjukanKolaborasiRequest>({
    defaultValues: {
      linkPendukung: [{ value: "" }],
      dokumenPendukung: [{ value: null }],
      kebutuhanProyek: [
        {
          kebutuhanProyek: "",
          bentukKolaborasi: "",
          penjelasanTambahan: ""
        }
      ]
    }
  })

  const connectorRef = useRef<HTMLDivElement>(null)
  const onSubmit = handleSubmit((formValues) => {
    setLoading(true)
    let { linkPendukung, dokumenPendukung, periodeMulai, periodeSelesai, ...rest } = formValues
    linkPendukung = linkPendukung?.map((link) => link.value).filter(Boolean)
    periodeMulai = new Date(periodeMulai).getTime()
    periodeSelesai = new Date(periodeSelesai).getTime()

    const data = JSON.stringify({
      ...rest,
      linkPendukung,
      periodeMulai,
      periodeSelesai
    })

    const formData = new FormData()
    formData.append("data", data)
    if (dokumenPendukung) {
      if (dokumenPendukung.filter((e) => e.value == null).length !== 1) {
        for (let i = 0; i < dokumenPendukung.length; i++) {
          formData.append("files", dokumenPendukung[i].value[0])
        }
      }
    }

    axiosInstance.post<BaseResponse>("/backend/proyek", formData).then((response) => {
      onOpen()
      setLoading(false)
    })
  })

  const getTitle = () => {
    if (role == "PENELITI") {
      return "Ajukan Pencarian Mitra"
    }
    return "Ajukan Pencarian Peneliti"
  }

  if (error) {
    return <Error statusCode={404}></Error>
  }

  return (
    <>
      <Head>
        <title>Meetry - {getTitle()}</title>
      </Head>
      <NavbarUser role={role}></NavbarUser>
      <Container>
        <Flex align="center" mb="32px" gap="16px">
          <Box as="a" href="/peneliti/dashboard">
            <ArrowBackIcon w="23px" h="32px" />
          </Box>
          <Text fontSize="3xl" fontWeight="bold">
            {getTitle()}
          </Text>
        </Flex>
        <Box w="70%" m="0 auto">
          <Flex ref={connectorRef} gap="32px">
            <Flex flexDir="column" w="50%" gap="16px">
              <Box backgroundColor={activeStep === 1 ? "gray.200" : "teal.500"} w="100%" h="4px"></Box>
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
              <Box backgroundColor="gray.200" w="100%" h="4px"></Box>
              <Box>
                <Text fontSize="sm" color="teal.500" fontWeight="semibold">
                  STEP 2
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  Isi Kebutuhan dan Kriteria {role == "MITRA" ? "Peneliti" : "Mitra"} yang Dicari
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
                  trigger={trigger}
                  getValues={getValues}
                ></OverviewProyek>
              )}
              {activeStep === 2 && (
                <KriteriaKerjasama
                  role={role}
                  connectorRef={connectorRef}
                  register={register}
                  prevStep={prevStep}
                  errors={errors}
                  control={control}
                  isLoading={isLoading}
                ></KriteriaKerjasama>
              )}
            </form>
          </Box>
        </Box>
      </Container>
      <RequestProyekSuccessModal isOpen={isOpen} onClose={onClose} role={role}></RequestProyekSuccessModal>
    </>
  )
}

export default AjukanKolaborasi
