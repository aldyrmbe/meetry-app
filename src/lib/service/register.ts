import { axiosInstance } from "@lib/service/axios"
import { showToast } from "@lib/toast/toast"
import { NextRouter } from "next/router"

export interface RegisterPenelitiFormValues {
  namaLengkap: string
  email: string
  password: string
  NIDN: number
  perguruanTinggi: string
  programStudi: string
  jenisKelamin: "Pria" | "Wanita"
  tanggalLahir: any
  nomorKTP: number
  nomorTelepon: number
  alamatLengkap: string
  bioSingkat: string
  website?: string
  fotoProfil?: any
}

export const registerPeneliti = (
  data: RegisterPenelitiFormValues,
  toast: any,
  router: NextRouter,
  setSending: (isSending: boolean) => void
) => {
  let { tanggalLahir, fotoProfil, ...rest } = data
  tanggalLahir = new Date(tanggalLahir).getTime()
  fotoProfil = fotoProfil?.[0]
  const request = {
    tanggalLahir,
    ...rest
  }
  const formData = new FormData()
  formData.append("data", JSON.stringify(request))
  if (fotoProfil) formData.append("fotoProfil", fotoProfil)
  axiosInstance
    .post("/backend/user/register/peneliti", formData)
    .then((res) => {
      showToast(toast, {
        title: "Registrasi berhasil!",
        description: "Registrasi peneliti berhasil dilakukan.",
        status: "success"
      })
      router.push("/")
    })
    .catch((err) => {
      setSending(false)
      showToast(toast, {
        title: "Registrasi gagal!",
        description: "Cek kembali data yang dimasukkan.",
        status: "error"
      })
    })
}
