import { PaginationData } from "./../base"
import { ApiResponse } from "../base"

export type GetLogbooksApiResponse = ApiResponse & {
  data: GetLogbookDataResponse
}

export type GetLogbookDataResponse = {
  paginationData: PaginationData
  logbookData: LogbookData[]
}

export type LogbookData = {
  id: string
  createdAt: number
  sender: LogbookSender
  judul: string
  waktu: number
  deskripsi: string
  tags: string[]
}

export type LogbookSender = {
  fotoProfil: string
  nama: string
}
