import { Role } from "src/service/user"
import { PaginationData } from "@/types/base"
import { ApiResponse } from "../base"

export type StatusType = "DALAM_PENGAJUAN" | "DALAM_DISKUSI" | "AKTIF" | "SELESAI" | "DIBATALKAN"

export type GetProyekListResponse = ApiResponse & {
  data: GetProyekListResponseData
}

export type GetProyekListResponseData = {
  paginationData: PaginationData
  proyekData: ProyekData[]
}

export type ProyekData = {
  id: string
  pemohon: Role
  judul: string
  partisipan: string
  status: StatusType
}

export type StatusTypeMappingType = {
  [key in StatusType]: string
}

export const StatusTypeMapping: StatusTypeMappingType = {
  DALAM_PENGAJUAN: "Dalam pengajuan",
  DALAM_DISKUSI: "Dalam diskusi",
  AKTIF: "Aktif",
  SELESAI: "Selesai",
  DIBATALKAN: "Dibatalkan"
}
