import { Box, Flex } from "@chakra-ui/react"
import Container from "@components/layout/Container/Container"
import NavbarUser from "@components/layout/Navbar/NavbarUser"
import Filter from "@components/page-component/Search/Filter"
import SearchResultSection from "@components/page-component/Search/SearchResultSection"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { authenticate } from "src/service/auth"

export const getServerSideProps: GetServerSideProps = authenticate("eric")

const EricSearch = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>Cari Pengguna</title>
      </Head>
      <NavbarUser id={id} role="ERIC" />
      <Filter />
      <Container minH="calc(100vh - 161px)" mt="1px" gap="32px">
        <SearchResultSection />
      </Container>
    </>
  )
}

export default EricSearch
