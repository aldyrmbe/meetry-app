import { axiosInstance } from "@lib/service/axios"
import BaseResponse from "@lib/service/baseResponse"
import { useEffect, useState } from "react"

export interface RincianProyek {
  label: string
  value: string
}

export interface ApiResponse extends BaseResponse {
  data: RincianProyek[]
}

const useDetailProyek = (proyekId: string | undefined) => {
  const [detailProyek, setDetailProyek] = useState<RincianProyek[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (proyekId) {
      axiosInstance.get<ApiResponse>(`/api/requestProyek/${proyekId}`).then((response) => {
        setDetailProyek(response.data.data)
        setLoading(false)
      })
      setLoading(true)
    }
  }, [proyekId])

  return { detailProyek, isLoading }
}

export default useDetailProyek
