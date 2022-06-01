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
    >
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
    </Flex>
  )
}

export default NotificationItem
