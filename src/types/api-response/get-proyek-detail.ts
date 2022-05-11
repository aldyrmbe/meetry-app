import { StatusType } from "./get-proyek-list"
import { ApiResponse } from "@/types/base"

export type ProyekDetailApiResponse = ApiResponse & {
  data: ProyekDetailApiResponseData
}

export type ProyekDetailApiResponseData = {
  status: StatusType
  pemohon: "PENELITI" | "MITRA"
  overviewProyek: OverviewProyek
  kebutuhanProyek: KebutuhanProyek[]
  folders?: Folder[]
}

export type OverviewProyek = {
  judul: string
  partisipan: Partisipan
  periode: string
  bidang: string
  latarBelakang: string
  tujuan: string
  sasaran: string
  output: string
  kebermanfaatanProduk: string
  indikatorKesuksesan: string
  tingkatKesiapan: string
  linkPendukung?: Pendukung[]
  dokumenPendukung?: Pendukung[]
  whatsappGroupLink?: string
}

export type Partisipan = {
  mitra: DetailPartisipan[]
  peneliti: DetailPartisipan[]
  accountOfficer?: DetailPartisipan
}

export type DetailPartisipan = {
  id: string
  nama: string
  fotoProfil: string
  profilePageUrl: string
}

export type Pendukung = {
  nama: string
  value: string
}

export type KebutuhanProyek = {
  kebutuhanProyek: string
  bentukKolaborasi: string
  penjelasanTambahan: string
  partisipan: string
}

export type Folder = {
  id: string
  namaFolder: string
}
