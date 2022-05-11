import { Box } from "@chakra-ui/react"
import SearchBarInput from "@components/input/SearchBarInput"
import useDebounce from "@hooks/useDebounce"
import { useState } from "react"
import DetailProyek from "./DetailProyek"
import TableListProyek from "./TableListProyek"

type PermohonanPencarianProyekTabType = {
  pemohon: "PENELITI" | "MITRA"
}

const PermohonanPencarianProyekTab = ({ pemohon }: PermohonanPencarianProyekTabType) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [proyekId, setProyekId] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce(searchQuery)

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    setSearchQuery(input.value)
  }

  return (
    <Box>
      {proyekId ? (
        <DetailProyek proyekId={proyekId} setProyekId={setProyekId}></DetailProyek>
      ) : (
        <Box>
          <SearchBarInput placeholder="Cari proyek" onChange={handleSearchInput}></SearchBarInput>
          <TableListProyek pemohon={pemohon} searchQuery={debouncedValue} setProyekId={setProyekId}></TableListProyek>
        </Box>
      )}
    </Box>
  )
}

export default PermohonanPencarianProyekTab
