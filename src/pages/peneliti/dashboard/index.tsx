import { Box } from "@chakra-ui/react"
import Container from "@components/Container/Container"
import NavbarPeneliti from "@components/Navbar/NavbarPeneliti"
import Head from "next/head"
import MainMenuSection from "@components/Dashboard/MainMenuSection/MainMenuSection"
import NotificationSection from "@components/Dashboard/NotificationSection/NotificationSection"
import { GetServerSideProps } from "next"
import authenticate from "@lib/service/auth"
import AuthorizedPage from "@components/AuthorizedPage/AuthorizedPage"

export const getServerSideProps: GetServerSideProps = authenticate("peneliti")

const DashboardPeneliti = () => {
  return (
    <>
      <Head>
        <title>Meetry - Dashboard Peneliti</title>
      </Head>
      <NavbarPeneliti></NavbarPeneliti>
      <Container gap="32px">
        <Box w="55%">
          <MainMenuSection role="peneliti"></MainMenuSection>
        </Box>
        <Box w="45%">
          <NotificationSection role="peneliti"></NotificationSection>
        </Box>
      </Container>
    </>
  )
}

export default AuthorizedPage(DashboardPeneliti)
