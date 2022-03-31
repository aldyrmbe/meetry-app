import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react"
import MenuHeader from "@components/Dashboard/MenuHeader"
import MenuBoxedIcon from "@components/Icon/MenuBoxedIcon"
import IconLabel from "@components/Dashboard/IconLabel"
import ExclamationIcon from "@components/Icon/ExclamationIcon"
import MenuCard from "@components/Dashboard/MainMenuSection/MenuCard"
import { getRoleBasedPath } from "@lib/utils/basePath"

interface MainMenuSectionProps {
  role: "peneliti" | "mitra"
}

const MainMenuSection = ({ role }: MainMenuSectionProps) => {
  return (
    <>
      <MenuHeader>
        <MenuBoxedIcon></MenuBoxedIcon>
        <IconLabel>Pilih menu</IconLabel>
      </MenuHeader>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        h="70vh"
        gap="32px"
        mt="20px"
      >
        <GridItem rowSpan={2} colSpan={1}>
          <MenuCard text="Profil Saya" href={getRoleBasedPath(role, "/profile")}></MenuCard>
        </GridItem>
        <GridItem rowSpan={2}>
          <MenuCard text="Ajukan Kolaborasi" href={getRoleBasedPath(role, "/request")}></MenuCard>
        </GridItem>
        <GridItem colSpan={2}>
          <Box p="12px 16px" backgroundColor="blue.100" borderRadius="6px">
            <Flex gap="12px" w="100%">
              <ExclamationIcon></ExclamationIcon>
              <Box>
                <Text fontWeight="bold">Ada Kendala?</Text>
                <Text>Kirimkan rincian kendala Anda ke email: eric@ugm.ac.id</Text>
              </Box>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default MainMenuSection
