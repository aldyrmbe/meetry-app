import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react"
import MenuHeader from "@components/page-component/Dashboard/MenuHeader"
import MenuBoxedIcon from "@components/icon/MenuBoxedIcon"
import IconLabel from "@components/page-component/Dashboard/IconLabel"
import ExclamationIcon from "@components/icon/ExclamationIcon"
import MenuCard from "@components/page-component/Dashboard/MainMenuSection/MenuCard"
import { useEffect, useState } from "react"
import { axiosInstance } from "src/service/axios"
import { GetAcadstaffLinkResponse } from "@/types/api-response/get-acadstaff-link"
import { getReverseRoleMapping, getRoleMapping, Role } from "src/service/user"

type MainMenuSectionProps = {
  id?: string
  role: Role
}

const MainMenuSection = ({ id, role }: MainMenuSectionProps) => {
  const [acadstaffLink, setAcadstaffLink] = useState<string | undefined>(undefined)
  const roleString = getRoleMapping(role)

  useEffect(() => {
    if (roleString == "peneliti") {
      axiosInstance.get<GetAcadstaffLinkResponse>("/backend/user/peneliti/acadstaffLink").then((res) => {
        setAcadstaffLink(res.data.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <MenuHeader>
        <MenuBoxedIcon></MenuBoxedIcon>
        <IconLabel>Pilih menu</IconLabel>
      </MenuHeader>
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" h="70vh" gap="32px" mt="20px">
        {roleString == "peneliti" && (
          <>
            <GridItem rowSpan={2} colSpan={1}>
              <MenuCard text="Profil Acadstaff Saya" href={acadstaffLink} externalLink openInNewTab></MenuCard>
            </GridItem>
            <GridItem rowSpan={2}>
              <MenuCard text="Ajukan Pencarian Mitra" href={`/peneliti/request`}></MenuCard>
            </GridItem>
          </>
        )}
        {roleString == "mitra" && (
          <>
            <GridItem rowSpan={2} colSpan={1}>
              <MenuCard text="Profil Saya" href={`/profile/${id}`} openInNewTab></MenuCard>
            </GridItem>
            <GridItem rowSpan={2}>
              <MenuCard text="Ajukan Pencarian Peneliti" href={`/mitra/request`}></MenuCard>
            </GridItem>
          </>
        )}
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
    </section>
  )
}

export default MainMenuSection
