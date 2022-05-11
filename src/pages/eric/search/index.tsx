import { Box, Flex } from "@chakra-ui/react"
import Container from "@components/layout/Container/Container"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import Filter from "@components/page-component/Search/Filter"
import SearchResultSection from "@components/page-component/Search/SearchResultSection"
import Head from "next/head"

const EricSearch = () => {
  return (
    <>
      <Head>
        <title>Cari Pengguna</title>
      </Head>
      <NavbarUser role="ERIC" />
      <Filter />
      <Container minH="calc(100vh - 161px)" mt="1px" gap="32px">
        <SearchResultSection />
      </Container>
    </>
  )
}

export default EricSearch
