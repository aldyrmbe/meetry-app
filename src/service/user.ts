import { serverSideAxiosInstance } from "src/service/axios"

export interface User {
  id: string
  role: "PENELITI" | "MITRA" | "ERIC" | "ACCOUNT_OFFICER"
}

export const getUser = async (cookie: string | undefined) => {
  try {
    const request = await serverSideAxiosInstance(cookie).get<User>("/backend/user")
    return request.data
  } catch (error) {
    return undefined
  }
}
