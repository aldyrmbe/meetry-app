import BaseResponse from "@lib/service/baseResponse"
import { axiosInstance } from "@lib/service/axios"
import { useEffect, useState } from "react"

export interface ProyekData {
  id: string
  nama: string
  fotoProfil: string
  judulProyek: string
  bidang: string
}

export interface ApiResponse extends BaseResponse {
  data: ProyekData[]
  pagination: {
    totalPage: number
    currentPage: number
  }
}

const useSearchPermohonanProyek = (type: "mitra" | "peneliti", searchQuery: string) => {
  const [data, setData] = useState<ApiResponse>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    axiosInstance
      .get<ApiResponse>(`/api/searchProyek?type=${type}&searchQuery=${searchQuery}&page=${page}`)
      .then((response) => {
        setLoading(false)
        setData(response.data)
      })
    setLoading(true)
  }, [page, searchQuery])

  return { data, isLoading, setPage }
}

export default useSearchPermohonanProyek
