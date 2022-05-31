import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import AuthorizedPage from "@components/AuthorizedPage/AuthorizedPage"
import Container from "@components/layout/Container/Container"
import { authenticate } from "src/service/auth"
import { GetServerSideProps } from "next"
import Head from "next/head"
import PermohonanPencarianProyekTab from "@components/page-component/Dashboard/PermohonanPencarianProyek/PermohonanPencarianProyekTab"
import AccountOfficerSection from "@components/page-component/Dashboard/AccountOfficerSection/AccountOfficerSection"
import { Role } from "src/service/user"
import NavbarUser from "@components/layout/Navbar/NavbarUser"

export const getServerSideProps: GetServerSideProps = authenticate("eric")

const DashboardERIC = ({ id, role }: { id: string; role: Role }) => {
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
      <NavbarUser id={id} role={role}></NavbarUser>
      <Container maxH="calc(100vh - 80px)" gap="32px">
        <Box as="section" boxShadow="base" borderRadius="6px" backgroundColor="#FFF" w="70%" p="32px">
          <Tabs variant="unstyled">
            <TabList gap="32px">
              <Tab _selected={_selected}>Permohonan Pencarian Mitra</Tab>
              <Tab _selected={_selected}>Permohonan Pencarian Peneliti</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="32px 0">
                <PermohonanPencarianProyekTab pemohon="PENELITI"></PermohonanPencarianProyekTab>
              </TabPanel>
              <TabPanel p="32px 0">
                <PermohonanPencarianProyekTab pemohon="MITRA"></PermohonanPencarianProyekTab>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <AccountOfficerSection></AccountOfficerSection>
      </Container>
    </>
  )
}

export default AuthorizedPage(DashboardERIC)
