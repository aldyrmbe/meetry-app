import { VStack, Flex, Text } from "@chakra-ui/react"
import EllipseIcon from "@components/Icon/EllipseIcon"
import { getDisplayTime } from "@lib/utils/date"

interface NotificationData {
  sender: string
  time: number
  type?: string
  title: string
  body: string
}

interface NotificationItemProps {
  notification: NotificationData
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { sender, time, type, title, body } = notification
  return (
    <VStack align="start">
      <Flex align="center" gap="16px">
        <Text fontSize="md" color="gray.500">
          {sender}
        </Text>
        <EllipseIcon></EllipseIcon>
        <Text fontSize="md" color="gray.500">
          {getDisplayTime(time)}
        </Text>
      </Flex>
      <Text fontSize="lg" fontWeight="semibold">
        {title}
      </Text>
      <Text>{body}</Text>
    </VStack>
  )
}

export default NotificationItem