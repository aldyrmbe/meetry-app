import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import AuthorizedPage from "@components/AuthorizedPage/AuthorizedPage"
import Container from "@components/Container/Container"
import PermohonanPencarianMitra from "@components/Dashboard/PermohonanPencarianProyek/PermohonanPencarianMitra"
import PermohonanPencarianPeneliti from "@components/Dashboard/PermohonanPencarianProyek/PermohonanPencarianPeneliti"
import NavbarERIC from "@components/Navbar/NavbarERIC"
import authenticate from "@lib/service/auth"
import { GetServerSideProps } from "next"
import Head from "next/head"

export const getServerSideProps: GetServerSideProps = authenticate("eric")

const DashboardERIC = () => {
  const _selected = {
    color: "teal.500",
    fontWeight: "bold",
    borderBottomWidth: "2px",
    borderBottomColor: "teal.500"
  }
  return (
    <>
      <Head>
        <title>Meetry - Dashboard ERIC</title>
      </Head>
      <NavbarERIC></NavbarERIC>
      <Container gap="32px">
        <Box boxShadow="base" borderRadius="6px" backgroundColor="#FFF" w="70%" p="32px">
          <Tabs variant="unstyled">
            <TabList gap="32px">
              <Tab _selected={_selected}>Permohonan Pencarian Mitra</Tab>
              <Tab _selected={_selected}>Permohonan Pencarian Peneliti</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="32px 0">
                <PermohonanPencarianMitra></PermohonanPencarianMitra>
              </TabPanel>
              <TabPanel p="32px 0">
                <PermohonanPencarianPeneliti></PermohonanPencarianPeneliti>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box w="30%" boxShadow="base" borderRadius="6px" backgroundColor="white" p="20px"></Box>
      </Container>
    </>
  )
}

export default AuthorizedPage(DashboardERIC)
