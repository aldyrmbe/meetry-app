import SearchBarInput from "@components/Input/SearchBarInput"
import useDebounce from "@lib/hooks/useDebounce"
import { useState } from "react"
import DetailProyek from "./DetailProyek"
import TableListProyek from "./TableListProyek"

const PermohonanPencarianPeneliti = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [proyekId, setProyekId] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce(searchQuery)

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    console.log(input.value)
    setSearchQuery(input.value)
  }

  return (
    <>
      {proyekId ? (
        <DetailProyek proyekId={proyekId} setProyekId={setProyekId}></DetailProyek>
      ) : (
        <>
          <SearchBarInput placeholder="Cari proyek" onChange={handleSearchInput}></SearchBarInput>
          <TableListProyek
            type="mitra"
            searchQuery={debouncedValue}
            setProyekId={setProyekId}
          ></TableListProyek>
        </>
      )}
    </>
  )
}

export default PermohonanPencarianPeneliti
