import { Flex, SlideFade, Text } from "@chakra-ui/react"
import EllipseIcon from "@components/icon/EllipseIcon"
import LinkifyText from "@components/Linkify/LinkifyText"
import { getDisplayTime } from "src/utils/date"
import { NotificationData } from "@/types/api-response/notification"
import Link from "next/link"
import { Client } from "stompjs"
import { axiosInstance } from "src/service/axios"

type NotificationItemProps = {
  notification: NotificationData
  userId: string
}

const NotificationItem = ({ notification, userId }: NotificationItemProps) => {
  const { id, createdAt, title, description, opened } = notification

  const openNotification = () => {
    axiosInstance.put(`/backend/user/openNotification/${userId}/${id}`)
  }

  return (
    <SlideFade in={true}>
      <Link href={notification.redirectionUrl}>
        <Flex
          flexDir="column"
          p="32px"
          gap="12px"
          border="1px"
          borderColor="gray.200"
          borderRadius="base"
          boxShadow="base"
          cursor="pointer"
          transition="linear 0.2s"
          _hover={{
            backgroundColor: "#EDEDED"
          }}
          onClick={openNotification}
        >
          <Flex align="center" gap="16px">
            <Text fontSize="md" color="gray.500">
              Tim ERIC UGM
            </Text>
            <EllipseIcon />
            <Text fontSize="md" color="gray.500">
              {getDisplayTime(createdAt)}
            </Text>
          </Flex>
          <Flex gap="12px" align="center">
            {!opened && <EllipseIcon fill="#319795" />}
            <Text fontSize="lg" fontWeight="semibold">
              {title}
            </Text>
          </Flex>
          <LinkifyText value={description}></LinkifyText>
        </Flex>
      </Link>
    </SlideFade>
  )
}

export default NotificationItem
