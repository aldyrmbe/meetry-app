import { PaginationData } from "@/types/base"
import { ApiResponse } from "../base"

export type SearchMitraApiResponse = ApiResponse & {
  data: SearchMitraApiDataResponse
}

export type SearchMitraApiDataResponse = {
  paginationData: PaginationData
  mitraList: MitraDetail[]
}

export type MitraDetail = {
  id: string
  fotoProfil: string
  nama: string
  bidang: string
  alamat: string
  profileUrl: string
}
