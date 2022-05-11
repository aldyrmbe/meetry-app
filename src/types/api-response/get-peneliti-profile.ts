import { ApiResponse } from "../base"

export type GetPenelitiProfileApiResponse = ApiResponse & {
  data: GetPenelitiProfileResponseData
}

export type GetPenelitiProfileResponseData = {
  nama: string
  universitas: string
  programStudi: string
  email: string
  profileUrl: string
}
