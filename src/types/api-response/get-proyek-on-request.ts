import { PaginationData } from "@/types/base"
import { ApiResponse } from "../base"

export type GetProyekOnRequestResponse = ApiResponse & {
  data: GetProyekOnRequestDataResponse
}

export type GetProyekOnRequestDataResponse = {
  paginationData: PaginationData
  proyekList: ProyekDetail[]
}

export type ProyekDetail = {
  id: string
  fotoProfil: string
  pemohon: string
  judul: string
  bidang: string
}
