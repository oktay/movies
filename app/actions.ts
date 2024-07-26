"use server"

import { cookies } from "next/headers"

export async function setRegion(region: string) {
  cookies().set("region", region, {
    maxAge: 60 * 60 * 24 * 365,
  })
}
