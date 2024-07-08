"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export const useDialog = () => {
  const [open, setOpen] = useState(false)
  const pathanme = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathanme])

  return [open, setOpen] as const
}
