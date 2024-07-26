import { cookies } from "next/headers"

import { getUserRegion } from "@/lib/utils"

export const getRegion = () => {
  return cookies().get("region")?.value ?? getUserRegion()
}
