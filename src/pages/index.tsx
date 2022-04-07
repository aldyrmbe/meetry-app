import { Box, Text, useToast } from "@chakra-ui/react"
import { getUser } from "src/service/user"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import PrimaryButton from "@components/button/PrimaryButton"
import Container from "@components/layout/Container/Container"
import OutlinedButton from "@components/button/OutlinedButton"
import Navbar from "@components/layout/Navbar/Navbar"
import Head from "next/head"
import { showToast } from "src/service/toast"
import { useEffect } from "react"
import Link from "next/link"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            Membantu mengelola pengerjaan proyek bersama<br></br>mitra terbaik secara efisien dan efektif
          </Text>
          <Link href="/register">
            <PrimaryButton p="10px 24px" mr="35px">
              Gabung Sekarang
            </PrimaryButton>
          </Link>
          <OutlinedButton p="10px 24px">Baca Lebih Lanjut</OutlinedButton>
        </Box>
        <Box backgroundColor="gray.200" w="662px" h="500px"></Box>
      </Container>
    </>
  )
}

export default Home
