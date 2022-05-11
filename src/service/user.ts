import { serverSideAxiosInstance } from "src/service/axios"

export type Role = "PENELITI" | "MITRA" | "ERIC" | "ACCOUNT_OFFICER"

export type RoleString = "peneliti" | "mitra" | "eric" | "accountofficer"

export const RoleMapping: { [key: string]: string } = {
  PENELITI: "peneliti",
  MITRA: "mitra",
  ERIC: "eric",
  ACCOUNT_OFFICER: "accountofficer"
}

export const getRoleMapping = (role: any) => {
  return RoleMapping[role]
}

export const ReversedRoleMapping: { [key: string]: string } = {
  peneliti: "PENELITI",
  mitra: "MITRA",
  eric: "ERIC",
  accountofficer: "ACCOUNT_OFFICER"
}

export const getReverseRoleMapping = (role: any) => {
  return ReversedRoleMapping[role]
}

export interface User {
  id: string
  role: Role
}

export const getUser = async (cookie: string | undefined) => {
  try {
    const request = await serverSideAxiosInstance(cookie).get<User>("/backend/user")
    return request.data
  } catch (error) {
    return undefined
  }
}
