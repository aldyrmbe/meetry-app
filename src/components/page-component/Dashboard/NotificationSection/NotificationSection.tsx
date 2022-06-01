import { Box, Text, Divider, VStack, Spinner, Center, Flex, Fade } from "@chakra-ui/react"
import MenuHeader from "@components/page-component/Dashboard/MenuHeader"
import NotificationIcon from "@components/icon/NotificationIcon"
import IconLabel from "@components/page-component/Dashboard/IconLabel"
import { axiosInstance } from "src/service/axios"
import { useEffect, useState } from "react"
import NotificationItem from "./NotificationItem"
import PrimaryButton from "@components/button/PrimaryButton"
import { NotificationData, GetNotificationResponse } from "@/types/api-response/notification"
import SockJS from "sockjs-client"
import { over } from "stompjs"
import { WEB_SOCKET_URL } from "@hooks/useRealtimeNotification"

const NotificationSection = ({ id }: { id: string }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchMoreData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMoreData = () => {
    setIsFetching(true)
    axiosInstance.get<GetNotificationResponse>(`/backend/user/notification?page=${page}`).then((response) => {
      const data = response.data.data
      const { currentPage, totalPage } = data.paginationData
      setPage((prevPage) => prevPage + 1)
      setHasMore(totalPage !== 0 && currentPage !== totalPage)
      setNotifications(notifications.concat(data.notifications))
      setIsFetching(false)
      setLoading(false)
    })
  }

  const clearNewNotificationBadge = () => {
    console.log("OK")
    const sockJSClient = new SockJS(WEB_SOCKET_URL)
    const stompJSClient = over(sockJSClient)

    const onConnected = () => {
      stompJSClient.send(`/app/clearNotification/${id}`, {})
    }

    const onError = (error: any) => {
      console.log(error)
    }

    stompJSClient.connect({}, onConnected, onError)
  }

  return (
    <section>
      <MenuHeader>
        <NotificationIcon></NotificationIcon>
        <IconLabel>Notifikasi</IconLabel>
      </MenuHeader>
      <Box
        id="notificationItems"
        mt="20px"
        h="70vh"
        overflowY="auto"
        boxShadow="base"
        borderRadius="6px"
        p="32px"
        w="100%"
        backgroundColor="white"
      >
        {isLoading ? (
          <Center h="100%">
            <Spinner color="teal.400" size="xl"></Spinner>
          </Center>
        ) : (
          <Fade in={true}>
            {/* <VStack align="stretch" divider={<Divider></Divider>} spacing="20px">
              {notifications.map((notification: NotificationData) => (
                <NotificationItem key={notification.id} notification={notification}></NotificationItem>
              ))}
            </VStack> */}
            <Flex flexDir="column" gap="16px">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </Flex>
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
    </section>
  )
}

export default NotificationSection
