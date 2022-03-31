import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { baseURL } from "@lib/service/axios"
import authenticate from "@lib/service/auth"

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const { role, authenticated } = await authenticate({ req, role: "PENELITI" })
  if (role && !authenticated)
    return NextResponse.redirect(`${baseURL}/${role.toLowerCase()}/dashboard`)
  if (!role && !authenticated) return NextResponse.redirect(baseURL)
}
