import { Role } from "./../service/user"
import { StatusType } from "@/types/api-response/get-proyek-list"

type FilterKeyValue = {
  value: StatusType | ""
  text: string
}

type FilterByRoleType = {
  [key in Role]: FilterKeyValue[]
}

const DALAM_PENGAJUAN: FilterKeyValue = {
  value: "DALAM_PENGAJUAN",
  text: "Dalam pengajuan"
}

const DALAM_DISKUSI: FilterKeyValue = {
  value: "DALAM_DISKUSI",
  text: "Dalam Diskusi"
}

const AKTIF: FilterKeyValue = {
  value: "AKTIF",
  text: "Aktif"
}

const SELESAI: FilterKeyValue = {
  value: "SELESAI",
  text: "Selesai"
}

const DIBATALKAN: FilterKeyValue = {
  value: "DIBATALKAN",
  text: "Dibatalkan"
}

const SEMUA: FilterKeyValue = {
  value: "",
  text: "Semua"
}

const filterByRole: FilterByRoleType = {
  PENELITI: [SEMUA, DALAM_PENGAJUAN, DALAM_DISKUSI, AKTIF, SELESAI, DIBATALKAN],
  MITRA: [SEMUA, DALAM_PENGAJUAN, DALAM_DISKUSI, AKTIF, SELESAI, DIBATALKAN],
  ERIC: [SEMUA, DALAM_DISKUSI, AKTIF, SELESAI, DIBATALKAN],
  ACCOUNT_OFFICER: [SEMUA, DALAM_DISKUSI, AKTIF, SELESAI, DIBATALKAN]
}

export const getFiltersByRole = (role: Role) => {
  return filterByRole[role]
}
