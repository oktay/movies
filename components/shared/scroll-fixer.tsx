"use client"

import { useEffect } from "react"

export const ScrollFixer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}
