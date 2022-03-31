import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import authenticate from "@lib/service/auth"

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const origin = req.nextUrl.origin
  const { role, authenticated } = await authenticate({ req, role: "PENELITI" })
  if (role && !authenticated)
    return NextResponse.redirect(`/${role.toLowerCase()}/dashboard`.toString()) // return NextResponse.redirect(`${baseURL}/${role.toLowerCase()}/dashboard`.toString())
  if (!role && !authenticated) return NextResponse.redirect(origin)
  return NextResponse.next()
}
