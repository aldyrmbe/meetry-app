import { Box, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import AccountOfficerSearchResult from "./AccountOfficerSearchResult"
import MitraSearchResult from "./MitraSearchResult"
import PenelitiSearchResult from "./PenelitiSearchResult"

const SearchResultSection = () => {
  const router = useRouter()
  const filter = router.query.filter

  const getSearchResults = () => {
    if (filter == undefined || filter == "semua") {
      return (
        <>
          <MitraSearchResult />
          <PenelitiSearchResult />
          <AccountOfficerSearchResult />
        </>
      )
    }
    if (filter == "peneliti") {
      return <PenelitiSearchResult />
    }
    if (filter == "mitra") {
      return <MitraSearchResult />
    }
    if (filter == "account officer") {
      return <AccountOfficerSearchResult />
    }
  }

  return (
    <Box as="section" w="65%">
      <Text fontSize="lg" fontWeight="medium" color="blackAlpha.700">
        Hasil pencarian
      </Text>
      {getSearchResults()}
    </Box>
  )
}

export default SearchResultSection
