import { PaginationData } from "@/types/base"
import { ApiResponse } from "../base"

export type SearchAccountOfficerApiResponse = ApiResponse & {
  data: SearchAccountOfficerApiDataResponse
}

export type SearchAccountOfficerApiDataResponse = {
  paginationData: PaginationData
  accountOfficerList: AccountOfficerDetail[]
}

export type AccountOfficerDetail = {
  id: string
  fotoProfil: string
  nama: string
  email: string
}
