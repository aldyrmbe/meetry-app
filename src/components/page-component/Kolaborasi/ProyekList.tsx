import { ProyekData, StatusTypeMapping } from "@/types/api-response/get-proyek-list"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { KolaborasiPageContext } from "src/pages/[role]/kolaborasi"

type ProyekListProps = {
  data: ProyekData
}

const ProyekList = ({ data }: ProyekListProps) => {
  const router = useRouter()
  const { setTabIndex } = useContext(KolaborasiPageContext)
  const proyekId = router.query.proyekId as string

  const getParticipant = () => {
    if (data.partisipan.length === 0) {
      if (data.pemohon == "PENELITI") {
        return "(belum ada mitra)"
      }
      return "(belum ada peneliti)"
    }
    return data.partisipan
  }

  const getFontWeight = () => {
    if (data.status === "AKTIF" || data.status === "DIBATALKAN") return "bold"
    return ""
  }

  const getStatus = () => {
    return StatusTypeMapping[data.status]
  }

  const getFontColor = () => {
    if (data.status === "AKTIF") return "teal.500"
    if (data.status === "DIBATALKAN") return "red.500"
    return "gray.500"
  }

  const onProyekClick = (proyekId: string) => {
    setTabIndex(0)
    const neededQueries = ["role", "searchQuery"]
    Object.keys(router.query).forEach((key) => {
      if (!neededQueries.includes(key)) delete router.query[key]
    })
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          proyekId
        }
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <Box
      p="20px"
      borderRadius="6px"
      border={proyekId === data.id ? "2px solid #319795" : "2px solid #E2E8F0"}
      boxShadow="base"
      backgroundColor="white"
      cursor="pointer"
      onClick={() => onProyekClick(data.id)}
    >
      <Flex flexDir="column" gap="12px">
        <Text fontSize="lg" fontWeight="semibold">
          {data.judul}
        </Text>
        <Text>{getParticipant()}</Text>
        <Text fontWeight={getFontWeight()} color={getFontColor()}>
          {getStatus()}
        </Text>
      </Flex>
    </Box>
  )
}

export default ProyekList
