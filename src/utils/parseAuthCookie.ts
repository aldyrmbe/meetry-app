export const parseAuthCookie = (req: any): string | undefined => {
  const cookieValue = req.cookies["meetry-session"]
  if (cookieValue) {
    const cookie = "meetry-session=" + cookieValue
    return cookie
  }
  return undefined
}
