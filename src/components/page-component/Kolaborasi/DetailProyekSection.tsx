import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { ProyekDetailApiResponse, ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { axiosInstance } from "src/service/axios"
import OverviewProyekTab from "./OverviewProyekTab"
import KebutuhanProyekTab from "./KebutuhanProyekTab"
import LogbookProyekTab from "./LogbookProyekTab"

const DetailProyekSection = () => {
  const { proyekId } = useContext(KolaborasiPageContext)
  const [isFetchingProyekDetail, setFetchingProyekDetail] = useState<boolean>(true)
  const [proyekDetail, setProyekDetail] = useState<ProyekDetailApiResponseData>()

  useEffect(() => {
    if (proyekId) {
      axiosInstance.get<ProyekDetailApiResponse>(`/backend/proyek/${proyekId}`).then((response) => {
        const data = response.data.data
        setProyekDetail(data)
        setFetchingProyekDetail(false)
      })
      setFetchingProyekDetail(true)
    }
  }, [proyekId])

  const _selected = {
    color: "teal.500",
    fontWeight: "bold",
    borderBottomWidth: "2px",
    borderBottomColor: "teal.500"
  }

  return (
    <Box h="calc(100vh - 80px - 80px)">
      {proyekId ? (
        <Box boxShadow="base" borderRadius="6px" backgroundColor="#FFF" p="32px">
          <Tabs defaultIndex={0} variant="unstyled">
            <TabList gap="32px">
              <Tab _selected={_selected}>Overview Proyek</Tab>
              <Tab _selected={_selected}>Kebutuhan Proyek</Tab>
              <Tab _selected={_selected}>Logbook</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="32px 0 0 0">
                <OverviewProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!}></OverviewProyekTab>
              </TabPanel>
              <TabPanel p="32px 0 0 0">
                <KebutuhanProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!}></KebutuhanProyekTab>
              </TabPanel>
              <TabPanel p="32px 0 0 0">
                <LogbookProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!}></LogbookProyekTab>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <Flex
          flexDir="column"
          borderRadius="6px"
          border="1px solid #E2E8F0"
          boxShadow="base"
          backgroundColor="white"
          h="80vh"
          align="center"
          justify="center"
          gap="44px"
        >
          <Box w="350px" h="275px" backgroundColor="gray.100">
            <Image alt="No project selected" w="100%" h="100%" src="/belum-memilih-proyek-illustration.webp"></Image>
          </Box>
          <Text>Silakan pilih satu judul proyek terlebih dahulu di sebelah kiri untuk melihat detailnya</Text>
        </Flex>
      )}
    </Box>
  )
}

export default DetailProyekSection
