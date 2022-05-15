import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react"

type ManfaatCardType = {
  data: {
    title: {
      image: string
      text: string
      description: string
    }
    body: {
      image: string
      text: string
    }[]
  }
}

const ManfaatCard = ({ data }: ManfaatCardType) => {
  return (
    <Box w="50%" p="32px" boxShadow="base" backgroundColor="white">
      <Flex gap="20px">
        <Image alt="Title image" w="64px" h="64px" src={data.title.image}></Image>
        <Flex flexDir="column" gap="8px">
          <Heading size="sm">{data.title.text}</Heading>
          <Text fontSize="lg" color="gray.500">
            {data.title.description}
          </Text>
        </Flex>
      </Flex>
      <Divider my="32px" borderWidth="1px" backgroundColor="gray.300" />
      <Flex flexDir="column" gap="64px">
        {data.body.map((item, index) => (
          <Flex key={`${item.text}-${index}`} gap="32px">
            <Image alt="List image" w="64px" h="64px" src={item.image}></Image>
            <Text fontSize="xl">{item.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default ManfaatCard
