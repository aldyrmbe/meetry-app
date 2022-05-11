import { VStack, Flex, Text } from "@chakra-ui/react"
import EllipseIcon from "@components/icon/EllipseIcon"
import LinkifyText from "@components/Linkify/LinkifyText"
import { getDisplayTime } from "src/utils/date"
import { NotificationData } from "@/types/api-response/notification"

type NotificationItemProps = {
  notification: NotificationData
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { createdAt, title, description } = notification

  getDisplayTime

  return (
    <VStack align="start">
      <Flex align="center" gap="16px">
        <Text fontSize="md" color="gray.500">
          Tim ERIC UGM
        </Text>
        <EllipseIcon></EllipseIcon>
        <Text fontSize="md" color="gray.500">
          {getDisplayTime(createdAt)}
        </Text>
      </Flex>
      <Text fontSize="lg" fontWeight="semibold">
        {title}
      </Text>
      <LinkifyText value={description}></LinkifyText>
    </VStack>
  )
}

export default NotificationItem
