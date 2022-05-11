import { PaginationData } from "@/types/base"
import { ApiResponse } from "../base"

export type SearchPenelitiApiResponse = ApiResponse & {
  data: SearchPenelitiApiDataResponse
}

export type SearchPenelitiApiDataResponse = {
  paginationData: PaginationData
  penelitiList: PenelitiDetail[]
}

export type PenelitiDetail = {
  id: string
  fotoProfil: string
  nama: string
  programStudi: string
  profileUrl: string
}
