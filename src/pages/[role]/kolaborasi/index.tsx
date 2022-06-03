import { StatusType } from "@/types/api-response/get-proyek-list"
import { Box, useDisclosure } from "@chakra-ui/react"
import Container from "@components/layout/Container/Container"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import DetailProyekSection from "@components/page-component/Kolaborasi/DetailProyekSection"
import ListProyekSection from "@components/page-component/Kolaborasi/ListProyekSection"
import { GetServerSideProps } from "next"
import Error from "next/error"
import Head from "next/head"
import React, { useState } from "react"
import { Role } from "src/service/user"
import { customAuthenticate } from "src/service/auth"

export const getServerSideProps: GetServerSideProps = customAuthenticate([
  "peneliti",
  "mitra",
  "accountofficer",
  "eric"
])

type KolaborasiPageContextType = {
  isFilterOpen: boolean
  toggleFilter: () => void
  closeFilter: () => void
  filter: StatusType | undefined
  setFilter: (filter: StatusType) => void
  role: Role | undefined
  tabIndex: number
  setTabIndex: (tabIndex: number) => void
  isProyekEmpty: boolean
  setProyekEmpty: (isEmpty: boolean) => void
}

export const KolaborasiPageContext = React.createContext<KolaborasiPageContextType>({
  isFilterOpen: false,
  toggleFilter: () => {},
  closeFilter: () => {},
  filter: undefined,
  setFilter: () => {},
  role: undefined,
  tabIndex: 0,
  setTabIndex: () => {},
  isProyekEmpty: false,
  setProyekEmpty: () => {}
})

const Kolaborasi = ({ error, id, role }: { error: any; id: string; role: Role }) => {
  const { isOpen: isFilterOpen, onToggle: toggleFilter, onClose: closeFilter } = useDisclosure()
  const [filter, setFilter] = useState<StatusType | undefined>(undefined)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isProyekEmpty, setProyekEmpty] = useState<boolean>(true)

  const contextValue = {
    isFilterOpen,
    toggleFilter,
    closeFilter,
    filter,
    setFilter,
    role,
    tabIndex,
    setTabIndex,
    isProyekEmpty,
    setProyekEmpty
  }

  if (error) {
    return <Error statusCode={404}></Error>
  }

  return (
    <>
      <Head>
        <title>Meetry - Kolaborasi Saya</title>
      </Head>
      <NavbarUser id={id} role={role}></NavbarUser>
      <KolaborasiPageContext.Provider value={contextValue}>
        <Container gap="32px">
          <Box w="33%">
            <ListProyekSection></ListProyekSection>
          </Box>
          <Box w="67%">
            <DetailProyekSection></DetailProyekSection>
          </Box>
        </Container>
      </KolaborasiPageContext.Provider>
    </>
  )
}

export default Kolaborasi
