import { Box, HStack, Heading, Button } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Container from "@components/layout/Container/Container"
import Navbar from "@components/layout/Navbar/Navbar"
import Head from "next/head"
import RegisterCard from "@components/page-component/Register/RegisterCard/RegisterCard"
import { useState } from "react"

const Register = () => {
  const [selected, setSelected] = useState<"peneliti" | "mitra" | null>(null)
  const isDisabled: boolean = selected === null

  const handlePenelitiCardClick = () => {
    setSelected("peneliti")
  }
  const handleMitraCardClick = () => {
    setSelected("mitra")
  }
  const registerUrl = {
    peneliti: "/register/peneliti",
    mitra: "/register/mitra"
  }

  return (
    <>
      <Head>
        <title>Daftar Meetry</title>
      </Head>
      <Navbar></Navbar>
      <Container justify="space-between" align="flex-start">
        <Box>
          <HStack mb="32px" spacing="16px">
            <Box as="a" href="/">
              <ArrowBackIcon w="23px" h="32px" />
            </Box>
            <Heading as="h2" size="lg">
              Gabung Sebagai
            </Heading>
          </HStack>
          {/* Peneliti */}
          <RegisterCard
            type="peneliti"
            handleClick={handlePenelitiCardClick}
            isSelected={selected === "peneliti"}
          ></RegisterCard>
          {/* Mitra */}
          <RegisterCard
            type="mitra"
            handleClick={handleMitraCardClick}
            isSelected={selected === "mitra"}
          ></RegisterCard>
          <Button as="a" isDisabled={isDisabled} href={registerUrl[selected!]} colorScheme="teal">
            Lanjutkan
          </Button>
        </Box>
        <Box mt="-32px" mr="-40px" w="509px" h="568px" backgroundColor="gray.200"></Box>
      </Container>
    </>
  )
}

export default Register
