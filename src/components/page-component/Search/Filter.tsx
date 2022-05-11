import { Box, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

const FilterItem = ({ filterName }: { filterName: string }) => {
  const router = useRouter()
  const currentFilter = router.query.filter as string
  const isSelected = () => {
    if (currentFilter == undefined && filterName == "Semua") return true
    return filterName.toLowerCase() === currentFilter?.toLowerCase()
  }
  const filterState = isSelected() ? "selected" : "nonSelected"
  const props = {
    selected: {
      borderColor: "teal.500",
      color: "white",
      backgroundColor: "teal.500"
    },
    nonSelected: {
      borderColor: "gray.500",
      color: "gray.500",
      backgroundColor: "white"
    }
  }

  const handleClick = () => {
    router.push({
      pathname: "/eric/search",
      query: { ...router.query, filter: filterName.toLowerCase() }
    })
  }

  return (
    <Box
      cursor="pointer"
      whiteSpace="nowrap"
      borderRadius="full"
      borderColor={props[filterState].borderColor}
      borderWidth="2px"
      p="8px 16px"
      color={props[filterState].color}
      backgroundColor={props[filterState].backgroundColor}
      onClick={handleClick}
    >
      <Text fontSize="lg" fontWeight="semibold">
        {filterName}
      </Text>
    </Box>
  )
}

const Filter = () => {
  const filterNames = ["Semua", "Peneliti", "Mitra", "Account Officer"]

  return (
    <Flex p="16px 40px" gap="20px" backgroundColor="white" boxShadow="base" w="100%" mt="80px" h="80px">
      {filterNames.map((filterName, index) => (
        <FilterItem key={`${filterName}-${index}`} filterName={filterName}></FilterItem>
      ))}
    </Flex>
  )
}

export default Filter
