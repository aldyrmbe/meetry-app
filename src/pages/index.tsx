import { Box, Text, useToast } from "@chakra-ui/react"
import { getUser } from "src/lib/service/user"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import PrimaryButton from "@components/Button/PrimaryButton"
import Container from "@components/Container/Container"
import OutlinedButton from "@components/Button/OutlinedButton"
import Navbar from "@components/Navbar/Navbar"
import Head from "next/head"
import { showToast } from "@lib/toast/toast"
import { useEffect } from "react"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req.headers.cookie
  const user = await getUser(cookie)
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: `/${user?.role?.toLowerCase()}/dashboard`
      },
      props: {}
    }
  }
  return {
    props: {}
  }
}

const Home = () => {
  const router = useRouter()
  const toRegisterPage = (): void => {
    router.push("/register")
  }
  const toast = useToast()
  const isLoggedOut = router.query.isLoggedOut

  useEffect(() => {
    if (isLoggedOut) {
      showToast(toast, {
        title: "Anda sudah keluar",
        description: "Silakan masuk kembali.",
        status: "error"
      })
    }
  }, [isLoggedOut])

  return (
    <>
      <Head>
        <title>Meetry App</title>
      </Head>
      <Navbar></Navbar>
      <Container mt="32px" align="center" justify="space-between">
        <Box w="50%">
          <Text fontSize="5xl">
            Tempat Kolaborasi<br></br>Mitra Proyek Terbaik
          </Text>
          <Text fontSize="xl" my="32px" color="gray.500">
            Membantu mengelola pengerjaan proyek bersama<br></br>mitra terbaik secara efisien dan
            efektif
          </Text>
          <PrimaryButton p="10px 24px" mr="35px" onClick={toRegisterPage}>
            Gabung Sekarang
          </PrimaryButton>
          <OutlinedButton p="10px 24px">Baca Lebih Lanjut</OutlinedButton>
        </Box>
        <Box backgroundColor="gray.200" w="662px" h="500px"></Box>
      </Container>
    </>
  )
}

export default Home
