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
import { Client, Message, over } from "stompjs"
import { WEB_SOCKET_URL } from "@constants/websocketUrl"

const NotificationSection = ({ id: userId }: { id: string }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [newNotification, setNewNotification] = useState<NotificationData>()
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    fetchMoreData()
    let sockJSClient = new SockJS(WEB_SOCKET_URL)
    let stompJSClient = over(sockJSClient)

    const onMessageReceived = (message: Message) => {
      const response = JSON.parse(message.body) as NotificationData
      setNewNotification(response)
    }

    const onConnected = () => {
      stompJSClient.subscribe(`/getLatestNotification/${userId}`, onMessageReceived)
    }

    const onError = (error: any) => {
      console.log(error)
    }

    stompJSClient.connect({}, onConnected, onError)

    return () => {
      stompJSClient.disconnect(() => {
        console.log("Websocket disconnected")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (newNotification) {
      setNotifications([newNotification].concat(notifications))
    }
  }, [newNotification])

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
            <Flex flexDir="column" gap="16px">
              {notifications.map((notification) => (
                <NotificationItem userId={userId} key={notification.id} notification={notification} />
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
          </Fade>
        )}
      </Box>
    </section>
  )
}

export default NotificationSection
