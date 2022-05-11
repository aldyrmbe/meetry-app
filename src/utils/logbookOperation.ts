import { Role } from "./../service/user"
import { StatusType } from "./../types/api-response/get-proyek-list"

export const isLogbookOperationsAvailable = (status: StatusType, role: Role) => {
  return (role === "ERIC" || role === "ACCOUNT_OFFICER") && (status === "AKTIF" || status === "DALAM_DISKUSI")
}
