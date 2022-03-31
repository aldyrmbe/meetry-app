import { Box, Text, Divider, VStack, Spinner, Center, Flex, Fade } from "@chakra-ui/react"
import MenuHeader from "@components/Dashboard/MenuHeader"
import NotificationIcon from "@components/Icon/NotificationIcon"
import IconLabel from "@components/Dashboard/IconLabel"
import { axiosInstance } from "@lib/service/axios"
import { useEffect, useState } from "react"
import NotificationItem from "./NotificationItem"
import PrimaryButton from "@components/Button/PrimaryButton"

interface NotificationSectionProps {
  role: "peneliti" | "mitra"
}

interface NotificationData {
  sender: string
  time: number
  type?: string
  title: string
  body: string
}

interface Data {
  code: number
  status: string
  data: NotificationData[]
}

const NotificationSection = ({ role }: NotificationSectionProps) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchMoreData()
  }, [])

  const fetchMoreData = () => {
    setIsFetching(true)
    axiosInstance.get<Data>(`/api/notification?page=${page}`).then((response) => {
      const notificationsData = response.data.data
      setHasMore(notificationsData.length > 0)
      setNotifications(notifications.concat(notificationsData))
      setPage((prevState) => prevState + 1)
      setIsFetching(false)
      setLoading(false)
    })
  }

  return (
    <>
      <MenuHeader>
        <NotificationIcon></NotificationIcon>
        <IconLabel>Notifikasi</IconLabel>
      </MenuHeader>
      <Box
        id="notificationItems"
        mt="20px"
        h="70vh"
        overflowY="auto"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
        borderRadius="6px"
        p="32px"
        w="100%"
        backgroundColor="white"
      >
        {isLoading ? (
          <Center h="100%">
            <Spinner color="teal.500" size="xl"></Spinner>
          </Center>
        ) : (
          <Fade in={true}>
            <VStack align="stretch" divider={<Divider></Divider>} spacing="20px">
              {notifications.map((notification: NotificationData, index: number) => (
                <NotificationItem key={index} notification={notification}></NotificationItem>
              ))}
            </VStack>
            {hasMore && (
              <Box h="40px" mt="20px">
                <PrimaryButton
                  isLoading={!isLoading && isFetching}
                  loadingText="Memuat..."
                  onClick={fetchMoreData}
                  w="100%"
                >
                  Muat lebih banyak
                </PrimaryButton>
              </Box>
            )}
            {!isFetching && !hasMore && (
              <Flex h="40px" mt="20px" justify="center" align="center">
                <Text align="center">Tidak ada data yang bisa ditampilkan lagi</Text>
              </Flex>
            )}
          </Fade>
        )}
      </Box>
    </>
  )
}

export default NotificationSection
