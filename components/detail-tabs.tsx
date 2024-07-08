"use client"

import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const DetailTabs = ({
  id,
  type,
}: {
  id: string
  type: "movie" | "tv"
}) => {
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

  if (type === "tv") {
    tabs.splice(2, 0, {
      label: "Seasons",
      value: "seasons",
      href: `${page}/seasons`,
    })
  }

  const tab =
    pathname === page
      ? tabs[0]
      : tabs.find((tab) => pathname.includes(tab.value))

  function handleTabChange(value: string) {
    router.replace(value)
  }

  return (
    <Tabs value={tab?.value} className="w-full">
      <div className="mb-4 max-w-[100vw] justify-start overflow-auto md:w-auto md:justify-center">
        <TabsList>
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
      </div>
    </Tabs>
  )
}
