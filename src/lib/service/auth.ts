import { parseAuthCookie } from "@lib/utils/parseAuthCookie"
import { baseURL } from "@lib/service/axios"

interface AuthenticateUserParams {
  req: any
  role: "PENELITI" | "MITRA" | "ERIC" | "ACCOUNT_OFFICER"
}

interface AuthenticateReturn {
  role: "PENELITI" | "MITRA" | "ERIC" | "ACCOUNT_OFFICER" | undefined
  authenticated: boolean
}

const authenticate = async ({ req, role }: AuthenticateUserParams): Promise<AuthenticateReturn> => {
  const cookie = parseAuthCookie(req)
  if (cookie) {
    try {
      const response = await fetch(`${baseURL}/backend/user`, {
        credentials: "include",
        method: "GET",
        headers: {
          Cookie: cookie
        }
      })
      const user = await response.json()
      if (user?.role === role) {
        return Promise.resolve({ role: user?.role, authenticated: true })
      }
    } catch (err) {
      return Promise.resolve({ role: undefined, authenticated: false })
    }
  }
  return Promise.resolve({ role: undefined, authenticated: false })
}

export default authenticate
