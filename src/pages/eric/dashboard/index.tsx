import { Box } from "@chakra-ui/react"
import AuthorizedPage from "@components/AuthorizedPage/AuthorizedPage"
import Container from "@components/Container/Container"
import NavbarERIC from "@components/Navbar/NavbarERIC"
import authenticate from "@lib/service/auth"
import { GetServerSideProps } from "next"
import Head from "next/head"

export const getServerSideProps: GetServerSideProps = authenticate("eric")

const DashboardERIC = () => {
  return (
    <>
      <Head>
        <title>Meetry - Dashboard ERIC</title>
      </Head>
      <NavbarERIC></NavbarERIC>
      <Container>
        <Box boxShadow="base" borderRadius="6px" backgroundColor="#FFF" w="70%" p="32px"></Box>
      </Container>
    </>
  )
}

export default AuthorizedPage(DashboardERIC)
