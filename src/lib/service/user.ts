import { serverSideAxiosInstance } from "src/lib/service/axios"

export interface User {
  id: string
  role: "PENELITI" | "MITRA" | "ERIC" | "ACCOUNT_OFFICER"
}

export const getUser = async (cookie: any) => {
  try {
    const request = await serverSideAxiosInstance(cookie).get<User>("/backend/user")
    const user = request.data
    return user
  } catch (error) {
    console.error(error)
  }
}
