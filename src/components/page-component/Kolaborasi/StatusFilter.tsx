import { Box, Flex, Radio, RadioGroup } from "@chakra-ui/react"
import { getFiltersByRole } from "@utils/getFiltersByRole"
import { useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"

const StatusFilter = () => {
  const { filter, setFilter, toggleFilter, role } = useContext(KolaborasiPageContext)
  const filters = getFiltersByRole(role!)

  const _setFilter = (e: any) => {
    setFilter(e)
    toggleFilter()
    // setTimeout(() => {
    //   toggleFilter()
    // }, 150)
  }

  return (
    <Box
      border="1px solid #E2E8F0"
      borderRadius="6px"
      boxShadow="md"
      backgroundColor="white"
      whiteSpace="nowrap"
      position="absolute"
      top="50%"
      left="-220%"
      p="20px"
    >
      <RadioGroup onChange={(e: any) => _setFilter(e)} value={filter} defaultValue="">
        <Flex gap="20px" flexDir="column">
          {filters.map(({ value, text }, index) => (
            <Radio key={index} value={value}>
              {text}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Box>
  )
}

export default StatusFilter
