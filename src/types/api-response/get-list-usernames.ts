import { ApiResponse } from "../base"

export type GetListUsernamesApiResponse = ApiResponse & {
  data: UsernameDetail[]
}

export type UsernameDetail = {
  label: string
  value: string
}
