"use client"

import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const DetailTabs = ({ id, type }: { id: string; type: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const page = `/${type}/${id}`

  const tabs = [
    {
      label: "Overview",
      value: "overview",
      href: `${page}`,
    },
    {
      label: "Credits",
      value: "credits",
      href: `${page}/credits`,
    },
    {
      label: "Recommendations",
      value: "recommendations",
      href: `${page}/recommendations`,
    },
    {
      label: "Similar",
      value: "similar",
      href: `${page}/similar`,
    },
    {
      label: "Images",
      value: "images",
      href: `${page}/images`,
    },
    {
      label: "Videos",
      value: "videos",
      href: `${page}/videos`,
    },
  ]

  const tab =
    pathname === page
      ? tabs[0]
      : tabs.find((tab) => pathname.includes(tab.value))

  function handleTabChange(value: string) {
    router.replace(value)
  }

  return (
    <Tabs value={tab?.value}>
      <TabsList className="mb-4 w-full justify-start overflow-auto md:w-auto md:justify-center">
        {tabs.map(({ label, value, href }) => (
          <TabsTrigger
            key={value}
            value={value}
            onClick={() => handleTabChange(href)}
            asChild
          >
            <button>{label}</button>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
