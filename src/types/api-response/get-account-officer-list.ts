import { PaginationData } from "./../base"
import { ApiResponse } from "../base"

export type GetAccountOfficerListResponse = ApiResponse & {
  data: GetAccountOfficerListDataResponse
}

export type GetAccountOfficerListDataResponse = {
  paginationData: PaginationData
  accountOfficerList: AccountOfficerDetails[]
}

export type AccountOfficerDetails = {
  nama: string
  email: string
  profilePhoto: string
}
