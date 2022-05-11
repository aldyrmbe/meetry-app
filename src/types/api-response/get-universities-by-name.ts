import { ApiResponse } from "../base"

export type GetUniversitiesByNameData = {
  label: string
  value: string
}

export type GetUniversitiesByNameResponse = ApiResponse & {
  data: GetUniversitiesByNameData[]
}
