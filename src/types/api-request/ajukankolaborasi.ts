export type AjukanKolaborasiRequest = {
  judul: string
  periodeMulai: any
  periodeSelesai: any
  bidang: string
  latarBelakang: string
  tujuan: string
  sasaran: string
  output: string
  ketepatanSolusi: string
  tolakUkurKesuksesan: string
  tingkatKesiapan: string
  linkPendukung?: any[]
  dokumenPendukung?: any[]
  kebutuhanProyek: KebutuhanProyek[]
}

export type KebutuhanProyek = {
  kebutuhanProyek: string
  bentukKolaborasi: string
  penjelasanTambahan?: string
}
