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
  proyekId: string | undefined
  setProyekId: (proyekId: string) => void
  role: Role | undefined
  folderId: string | undefined
  setFolderId: (folderId: string | undefined) => void
  subFolderId: string | undefined
  setSubFolderId: (subFolderId: string | undefined) => void
  subFolderName: string | undefined
  setSubFolderName: (subFolderName: string | undefined) => void
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
  proyekId: undefined,
  setProyekId: () => {},
  role: undefined,
  folderId: undefined,
  setFolderId: () => {},
  subFolderId: undefined,
  setSubFolderId: () => {},
  subFolderName: undefined,
  setSubFolderName: () => {},
  tabIndex: 0,
  setTabIndex: () => {},
  isProyekEmpty: false,
  setProyekEmpty: () => {}
})

const Kolaborasi = ({ error, id, role }: { error: any; id: string; role: Role }) => {
  const { isOpen: isFilterOpen, onToggle: toggleFilter, onClose: closeFilter } = useDisclosure()
  const [filter, setFilter] = useState<StatusType | undefined>(undefined)
  const [proyekId, setProyekId] = useState<string | undefined>(undefined)
  const [folderId, setFolderId] = useState<string | undefined>(undefined)
  const [subFolderId, setSubFolderId] = useState<string | undefined>(undefined)
  const [subFolderName, setSubFolderName] = useState<string | undefined>(undefined)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isProyekEmpty, setProyekEmpty] = useState<boolean>(true)

  const contextValue = {
    isFilterOpen,
    toggleFilter,
    closeFilter,
    filter,
    setFilter,
    proyekId,
    setProyekId,
    role,
    folderId,
    setFolderId,
    subFolderId,
    setSubFolderId,
    subFolderName,
    setSubFolderName,
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
