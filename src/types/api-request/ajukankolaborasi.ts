export type AjukanKolaborasiRequest = {
  judul: string
  periodeMulai: any
  periodeSelesai: any
  bidang: string
  latarBelakang: string
  tujuan: string
  sasaranPengguna: string
  output: string
  ketepatanSolusi: string
  tolakUkurKesuksesan: string
  tingkatKesiapan: string
  linkPendukung?: {
    value: any
  }[]
  dokumenPendukung?: {
    value: any
  }[]
  kebutuhanProyek: KebutuhanProyek[]
}

export type KebutuhanProyek = {
  kebutuhanProyek: string
  bentukKolaborasi: string
  bidangMitra: string[]
  penjelasanTambahan?: string
}
