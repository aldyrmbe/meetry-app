import { Box, Text, useToast, Link, Image, Heading, Flex, Divider } from "@chakra-ui/react"
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
import ManfaatCard from "@components/page-component/Home/ManfaatCard"
import CaraKerjaCard from "@components/page-component/Home/CaraKerjaCard"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req.headers.cookie
  const user = await getUser(cookie)
  if (user) {
    if (user.role === "ACCOUNT_OFFICER") {
      return {
        redirect: {
          permanent: false,
          destination: `/accountofficer/kolaborasi`
        },
        props: {}
      }
    }
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
      <Container p="32px 64px" mt="64px" align="center" justify="space-between">
        <Box w="50%">
          <Text fontSize="5xl">
            Temukan Mitra
            <br /> Proyek Terbaik di Sini
          </Text>
          <Text fontSize="xl" my="32px" color="gray.500">
            Kami membantu Anda menemukan mitra yang tepat <br /> sesuai kebutuhan dan memfasilitasi kegiatan kolaborasi
          </Text>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <PrimaryButton p="10px 24px" mr="35px">
              Gabung Sekarang
            </PrimaryButton>
          </Link>
          <OutlinedButton p="10px 24px" onClick={() => router.push("/#manfaat")}>
            Baca Lebih Lanjut
          </OutlinedButton>
        </Box>
        <Image alt="Hero" w="650px" h="434" src="/online-collab-illustration.webp" />
      </Container>
      <Box id="manfaat" h="80px" mt="-80px"></Box>
      <Box p="64px 40px" backgroundColor="#F0FFF4">
        <Heading textAlign="center" size="lg">
          Manfaat Penggunaan Produk
        </Heading>
        <Flex gap="64px" mt="64px">
          <ManfaatCard data={manfaatPeneliti} />
          <ManfaatCard data={manfaatMitra} />
        </Flex>
        <Box id="carakerja" mb="-64px" h="64px"></Box>
      </Box>
      <Box p="64px 40px" w="100%">
        <Heading textAlign="center" size="lg">
          Cara Kerja Sistem
        </Heading>
        <Flex mt="64px" justify="space-between">
          {caraKerja.map((data, index) => (
            <CaraKerjaCard key={data.image} index={index} data={data} />
          ))}
        </Flex>
      </Box>
      <Box backgroundColor="#F0FFF4" w="100%">
        <Flex p="64px" backgroundColor="#F0FFF4" w="100%" gap="64px">
          <Image alt="Footer" src="/footer-illustration.webp"></Image>
          <Flex flexDir="column" justify="space-between">
            <Text fontSize="3xl">
              Bergabunglah bersama Meetry, temukan mitra yang cocok <br /> sesuai kebutuhan, dan mulailah kolaborasi
              terbaik Anda <br /> sekarang juga
            </Text>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <PrimaryButton w="200px">Gabung Sekarang</PrimaryButton>
            </Link>
          </Flex>
        </Flex>
        <Box p="64px" w="100%">
          <Box backgroundColor="gray.200" h="2px" w="100%"></Box>
        </Box>
        <Text color="gray.500" pb="64px" textAlign="center">
          @2022. Fakultas Teknik Universitas Gadjah Mada |{" "}
          <Link color="gray.900" textDecoration="underline" href="mailto:eric@ugm.ac.id">
            Email
          </Link>
        </Text>
      </Box>
    </>
  )
}

const manfaatPeneliti = {
  title: {
    image: "/peneliti-title-image.webp",
    text: "Peneliti",
    description: "Dosen Universitas Gadjah Mada"
  },
  body: [
    {
      image: "/list-1-peneliti.webp",
      text: "Terhubung dengan para mitra dari industri-industri unggulan"
    },
    {
      image: "/list-2-peneliti.webp",
      text: "Mudah dalam menemukan mitra yang sesuai kebutuhan proyek"
    },
    {
      image: "/list-3-peneliti.webp",
      text: "Kolaborasi difasilitasi dan dikelola secara sistematis dengan bantuan tim kami"
    }
  ]
}

const manfaatMitra = {
  title: {
    image: "/mitra-title-image.webp",
    text: "Mitra Industri",
    description: "Perusahaan swasta, BUMN/D, Asosiasi, dan sebagainya"
  },
  body: [
    {
      image: "/list-1-mitra.webp",
      text: "Berjejaring dengan para peneliti terbaik dari kalangan dosen Universitas Gadjah Mada"
    },
    {
      image: "/list-2-mitra.webp",
      text: "Temukan kriteria peneliti yang diinginkan dengan proses yang mudah"
    },
    {
      image: "/list-3-mitra.webp",
      text: "Kolaborasi difasilitasi dan dikelola secara sistematis dengan bantuan tim kami"
    }
  ]
}

const caraKerja = [
  {
    image: "/cara-kerja-sistem-daftar.webp",
    title: "Daftar",
    description: "Buat akun baru, lengkapi profil, dan tunjukkan karya-karya terbaik Anda"
  },
  {
    image: "/cara-kerja-sistem-ajukan-pencarian.webp",
    title: "Ajukan Pencarian",
    description: "Isi formulir kebutuhan proyek dan cantumkan kriteria mitra yang ingin dicari"
  },
  {
    image: "/cara-kerja-sistem-tunggu.webp",
    title: "Tunggu",
    description: "Kami akan menghubungkan Anda dengan mitra yang cocok berdasarkan formulir yang diisii"
  },
  {
    image: "/cara-kerja-sistem-kolaborasi-dimulai.webp",
    title: "Kolaborasi Dimulai",
    description: "Diskusi dengan mitra, pantau kegiatan, dan lanjutkan kolaborasi"
  }
]

export default Home
