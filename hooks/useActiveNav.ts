"use client"

import { usePathname } from "next/navigation"

export const useActiveNav = (href: string) => {
  const pathname = usePathname()
  if (href === "/") return pathname === href
  return pathname.startsWith(href)
}
