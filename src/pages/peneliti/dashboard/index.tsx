import { Box, Text, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import Container from "@components/Container/Container"
import MenuBoxedIcon from "@components/Icon/MenuBoxedIcon"
import NotificationIcon from "@components/Icon/NotificationIcon"
import NavbarPeneliti from "@components/Navbar/NavbarPeneliti"
import Head from "next/head"
import React from "react"
import { useRouter } from "next/router"
import ExclamationIcon from "@components/Icon/ExclamationIcon"
import { getRoleBasedPath } from "@lib/utils/basePath"
import MainMenuSection from "@components/Dashboard/MainMenuSection/MainMenuSection"
import NotificationSection from "@components/Dashboard/NotificationSection/NotificationSection"

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

export default DashboardPeneliti
