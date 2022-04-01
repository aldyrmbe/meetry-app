import SearchBarInput from "@components/Input/SearchBarInput"
import { useState } from "react"
import TableListProyek from "./TableListProyek"

const PermohonanPencarianMitra = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearchInput = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement
      console.log(input.value)
      setSearchQuery(input.value)
    }
  }
  return (
    <>
      <SearchBarInput placeholder="Cari proyek" handleSearch={handleSearchInput}></SearchBarInput>
      <TableListProyek type="peneliti" searchQuery={searchQuery}></TableListProyek>
    </>
  )
}

export default PermohonanPencarianMitra
