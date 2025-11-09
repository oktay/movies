"use client"

import { useEffect, useRef, useState } from "react"

export const useExpandableContent = (limit = 3) => {
  const ref = useRef<HTMLDivElement>(null)
  const [expandable, setExpandable] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const countLines = () => {
    if (ref && ref.current) {
      const styles = window.getComputedStyle(ref.current)
      const lineHeight = parseInt(styles.lineHeight || "16")
      const height = ref.current.offsetHeight
      return Math.floor(height / lineHeight)
    }
    return 0
  }

  const toggleExpanded = () => {
    if (!expanded) {
      ref.current?.scrollIntoView({ behavior: "smooth" })
    }

    setExpanded((prev) => !prev)
  }

  useEffect(() => {
    const isExpandable = countLines() > limit
    setExpanded(!isExpandable)
    setExpandable(isExpandable)
  }, [limit])

  return { ref, expandable, expanded, toggleExpanded }
}
