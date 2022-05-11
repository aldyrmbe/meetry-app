import { ApiResponse } from "../base"

export type GetMitraProfileResponse = ApiResponse & {
  data: GetMitraProfileResponseData
}

export type GetMitraProfileResponseData = {
  namaPerusahaan: string
  fotoProfil: string
  bidangPerusahaan: string[]
  nomorTelepon: string
  email: string
  website: string
  profilSingkat: string
  jenisPerusahaan: string
  alamat: string
}
