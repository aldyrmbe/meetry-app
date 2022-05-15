import { Flex, Heading, Image, Text } from "@chakra-ui/react"

type CaraKerjaCardType = {
  index: number
  data: {
    image: string
    title: string
    description: string
  }
}

const CaraKerjaCard = ({ index, data }: CaraKerjaCardType) => {
  return (
    <Flex gap="32px" p="32px" flexDir="column" borderWidth="1px" borderColor="gray.400" w="23%" borderRadius="6px">
      <Image alt="Data image" w="250px" h="225px" src={data.image} />
      <Flex gap="20px" align="center">
        <Flex align="center" justify="center" p="4px 11px" backgroundColor="teal.500" borderRadius="6px">
          <Text color="white">{index + 1}</Text>
        </Flex>
        <Heading size="md">{data.title}</Heading>
      </Flex>
      <Text fontSize="lg">{data.description}</Text>
    </Flex>
  )
}

export default CaraKerjaCard
