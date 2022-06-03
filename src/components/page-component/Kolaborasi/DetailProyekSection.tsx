import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"
import { ProyekDetailApiResponse, ProyekDetailApiResponseData } from "@/types/api-response/get-proyek-detail"
import { axiosInstance } from "src/service/axios"
import OverviewProyekTab from "./OverviewProyekTab"
import KebutuhanProyekTab from "./KebutuhanProyekTab"
import LogbookProyekTab from "./LogbookProyekTab"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const FilesProyekTab = dynamic(() => import("@components/page-component/Kolaborasi/FilesProyekTab"))

const DetailProyekSection = () => {
  const router = useRouter()
  const { tabIndex, setTabIndex, isProyekEmpty } = useContext(KolaborasiPageContext)
  const [isFetchingProyekDetail, setFetchingProyekDetail] = useState<boolean>(true)
  const [proyekDetail, setProyekDetail] = useState<ProyekDetailApiResponseData>()

  const proyekId = router.query.proyekId as string
  const tabIndexParams = router.query.tabIndex as string

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

  useEffect(() => {
    if (tabIndexParams) {
      setTabIndex(2)
    }
  }, [])

  return (
    <Box h="calc(100vh - 80px - 80px)">
      {proyekId ? (
        <Box boxShadow="base" borderRadius="6px" backgroundColor="#FFF" p="32px">
          <Tabs index={tabIndex} variant="unstyled">
            <TabList gap="32px">
              <Tab onClick={() => setTabIndex(0)} _selected={_selected}>
                Overview Proyek
              </Tab>
              <Tab onClick={() => setTabIndex(1)} _selected={_selected}>
                Kebutuhan Proyek
              </Tab>
              <Tab onClick={() => setTabIndex(2)} _selected={_selected}>
                Logbook
              </Tab>
              <Tab onClick={() => setTabIndex(3)} _selected={_selected}>
                Files
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="32px 0 0 0">
                <OverviewProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!} />
              </TabPanel>
              <TabPanel p="32px 0 0 0">
                <KebutuhanProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!} />
              </TabPanel>
              <TabPanel p="32px 0 0 0">
                <LogbookProyekTab isLoading={isFetchingProyekDetail} data={proyekDetail!} />
              </TabPanel>
              <TabPanel p="32px 0 0 0">
                <FilesProyekTab data={proyekDetail} />
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
          <Text>
            {isProyekEmpty
              ? "Anda belum punya proyek apapun di sini"
              : "Silakan pilih satu judul proyek terlebih dahulu di sebelah kiri untuk melihat detailnya"}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default DetailProyekSection
