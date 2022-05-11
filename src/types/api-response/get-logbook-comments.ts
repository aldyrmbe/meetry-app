import { ApiResponse } from "../base"

export type GetLogbookCommentsResponse = ApiResponse & {
  data: Comment[]
}

export type Comment = {
  profilePhoto: string
  pengirim: string
  waktu: number
  isi: string
}
