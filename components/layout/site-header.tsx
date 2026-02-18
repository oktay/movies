import { Suspense } from "react"
import { cookies } from "next/headers"

import { Skeleton } from "@/components/ui/skeleton"
import { SiteMenu } from "@/components/layout/site-menu"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteSettings } from "@/components/layout/site-settings"
import { SearchInput } from "@/components/search/search-input"

export const SiteHeader = () => {
  const region = cookies().get("region")?.value ?? "US"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteNav />

        <div className="flex flex-1 justify-end gap-2">
          <Suspense fallback={<Skeleton className="h-10 w-60" />}>
            <SearchInput />
          </Suspense>

          <SiteSettings region={region} />

          <div className="lg:hidden">
            <SiteMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
