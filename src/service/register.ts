import { axiosInstance } from "src/service/axios"
import { showToast } from "src/service/toast"
import { NextRouter } from "next/router"

export type RegisterPenelitiFormValues = {
  namaLengkap: string
  email: string
  password: string
  NIDN: number
  perguruanTinggi: string
  programStudi: string
  jenisKelamin: "Laki-laki" | "Perempuan"
  tanggalLahir: any
  nomorKTP: number
  nomorTelepon: number
  alamatLengkap: string
  acadstaffLink: string
  fotoProfil?: any
}

export const registerPeneliti = (
  data: RegisterPenelitiFormValues,
  toast: any,
  router: NextRouter,
  setSending: (isSending: boolean) => void
) => {
  setSending(true)
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

export type RegisterMitraFormValues = {
  namaPerusahaan: string
  email: string
  password: string
  alamat: string
  jenisPerusahaan: string
  bidangPerusahaan: string[]
  nomorTelepon: string
  profilSingkat: string
  website?: string
  fotoProfil?: any
}

export const registerMitra = (
  formValues: RegisterMitraFormValues,
  toast: any,
  router: NextRouter,
  setSending: (isSending: boolean) => void
) => {
  let { fotoProfil, ...data } = formValues
  fotoProfil = fotoProfil?.[0]

  const formData = new FormData()
  formData.append("data", JSON.stringify(data))
  if (fotoProfil) formData.append("fotoProfil", fotoProfil)
  axiosInstance
    .post("/backend/user/register/mitra", formData)
    .then((res) => {
      showToast(toast, {
        title: "Registrasi berhasil!",
        description: "Registrasi mitra berhasil dilakukan.",
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
