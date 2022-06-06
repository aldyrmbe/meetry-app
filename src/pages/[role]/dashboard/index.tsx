import { Box } from "@chakra-ui/react"
import Container from "@components/layout/Container/Container"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import Head from "next/head"
import MainMenuSection from "@components/page-component/Dashboard/MainMenuSection/MainMenuSection"
import NotificationSection from "@components/page-component/Dashboard/NotificationSection/NotificationSection"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getUser, Role, getRoleMapping } from "src/service/user"
import Error from "next/error"
import { customAuthenticate } from "src/service/auth"
import { useEffect } from "react"
import SockJS from "sockjs-client"
import { over } from "stompjs"
import { WEB_SOCKET_URL } from "@constants/websocketUrl"

export const getServerSideProps: GetServerSideProps = customAuthenticate(["peneliti", "mitra"])

const Dashboard = ({ error, id, role }: { error: boolean; id: string; role: Role }) => {
  useEffect(() => {
    const sockJSClient = new SockJS(WEB_SOCKET_URL)
    const stompJSClient = over(sockJSClient)

    const onConnected = () => {
      stompJSClient.send(`/app/clearNotification/${id}`, {})
    }

    const onError = (error: any) => {
      console.log(error)
    }

    stompJSClient.connect({}, onConnected, onError)
  }, [])

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : (
        <>
          <Head>
            <title>Meetry - Dashboard {role.charAt(0) + role.slice(1).toLowerCase()}</title>
          </Head>
          <NavbarUser id={id} role={role}></NavbarUser>
          <Container gap="32px">
            <Box w="55%">
              <MainMenuSection id={id} role={role}></MainMenuSection>
            </Box>
            <Box w="45%">
              <NotificationSection id={id}></NotificationSection>
            </Box>
          </Container>
        </>
      )}
    </>
  )
}

export default Dashboard
