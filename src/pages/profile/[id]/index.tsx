import { GetMitraProfileResponse, GetMitraProfileResponseData } from "@/types/api-response/get-mitra-profile"
import { EmailIcon, ExternalLinkIcon, PhoneIcon } from "@chakra-ui/icons"
import { Box, Divider, Flex, Image, Link, Text } from "@chakra-ui/react"
import OutlinedButton from "@components/button/OutlinedButton"
import IndustrialIcon from "@components/icon/IndustrialIcon"
import Container from "@components/layout/Container/Container"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"
import { getUser, Role } from "src/service/user"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getUser(context.req.headers.cookie)
  if (user) {
    return {
      props: {
        role: user.role
      }
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/?isLoggedOut=true"
    },
    props: {}
  }
}

const InfoItem = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <Flex gap="20px">
      {icon}
      <Text>{text}</Text>
    </Flex>
  )
}

const InfoCard = ({ title, text }: { title: string; text: string }) => {
  return (
    <Box borderRadius="6px" boxShadow="base">
      <Box p="16px 32px" backgroundColor="gray.100" border="1px solid #E2E8F0">
        <Text fontSize="lg" fontWeight="semibold">
          {title}
        </Text>
      </Box>
      <Box p="16px 32px" backgroundColor="white" border="1px solid #E2E8F0">
        <Text fontSize="lg">{text}</Text>
      </Box>
    </Box>
  )
}

const ProfilePage = ({ role }: { role: Role }) => {
  const [mitraData, setMitraData] = useState<GetMitraProfileResponseData>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const mitraId = router.query.id

  useEffect(() => {
    setLoading(true)
    axiosInstance.get<GetMitraProfileResponse>(`/backend/user/mitra/${mitraId}`).then((response) => {
      setMitraData(response.data.data)
      setLoading(false)
    })
  }, [mitraId])

  return (
    <>
      <Head>
        <title>Profil Mitra</title>
      </Head>
      <NavbarUser role={role}></NavbarUser>
      {isLoading ? (
        <Container>
          <p>Loading...</p>
        </Container>
      ) : (
        <Container gap="32px">
          <Box w="30%">
            <Flex backgroundColor="white" borderRadius="6px" flexDir="column" boxShadow="base">
              <Flex p="32px" flexDir="column" align="center">
                <Image alt="Mitra profile" boxSize="100px" objectFit="cover" src={mitraData?.fotoProfil}></Image>
                <Text mt="20px" fontSize="lg" fontWeight="medium">
                  {mitraData?.namaPerusahaan}
                </Text>
                <Text mt="4px" color="gray.500">
                  Mitra
                </Text>
              </Flex>
              <Divider borderWidth="1px"></Divider>
              <Flex p="32px 20px" flexDir="column" gap="32px">
                <InfoItem icon={<IndustrialIcon />} text={mitraData?.bidangPerusahaan.join(", ")!}></InfoItem>
                <InfoItem icon={<PhoneIcon boxSize="24px" />} text={mitraData?.nomorTelepon!}></InfoItem>
                <InfoItem icon={<EmailIcon boxSize="24px" />} text={mitraData?.email!}></InfoItem>
              </Flex>
              <Divider borderWidth="1px"></Divider>
              <Flex p="32px">
                <Link w="100%" href={`https://${mitraData?.website}`} target="_blank">
                  <OutlinedButton w="100%" rightIcon={<ExternalLinkIcon />}>
                    Lihat Website
                  </OutlinedButton>
                </Link>
              </Flex>
            </Flex>
          </Box>
          <Box w="70%">
            <Flex flexDir="column" gap="32px">
              <InfoCard title="Profil Singkat" text={mitraData?.profilSingkat!}></InfoCard>
              <InfoCard title="Jenis Perusahaan" text={mitraData?.jenisPerusahaan!}></InfoCard>
              <InfoCard title="Alamat Perusahaan" text={mitraData?.alamat!}></InfoCard>
            </Flex>
          </Box>
        </Container>
      )}
    </>
  )
}

export default ProfilePage
