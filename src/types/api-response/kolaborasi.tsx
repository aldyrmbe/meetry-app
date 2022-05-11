import { ApiResponse } from "../base"

export type FilterType = "DALAM_PENGAJUAN" | "DALAM_DISKUSI" | "AKTIF" | "SELESAI" | "DIBATALKAN" | undefined

export type KolaborasiData = {
  id: string
  judul: string
  partisipan: {
    peneliti?: string[]
    mitra?: string[]
    accountofficer?: string
  }
  status: FilterType
}

export type GetListKolaborasiResponse = ApiResponse & {
  data: KolaborasiData[]
}
