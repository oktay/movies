"use client"

import { usePathname, useRouter } from "next/navigation"

interface UseDetailTabs {
  id: string
  type: "movie" | "tv" | "person"
  tabs: {
    label: string
    href: string
  }[]
}

export const useDetailTabs = ({ id, type, tabs }: UseDetailTabs) => {
  const router = useRouter()
  const pathname = usePathname()
  const page = `/${type}/${id}`

  const tabList = tabs.map((tab) => ({
    ...tab,
    value: `${page}/${tab.href}`,
  }))

  const activeTab = tabList.find((tab) => pathname.includes(tab.value))?.value

  function onChange(value: string) {
    router.replace(value)
  }

  return {
    activeTab,
    tabList,
    onChange,
  }
}
