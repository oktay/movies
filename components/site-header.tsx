"use client"

import { Suspense } from "react"

import { SiteNav } from "@/components/site-nav"

import { SearchInput } from "./search-input"
import { SiteMenu } from "./site-menu"
import { SiteNavSecondary } from "./site-nav-secondary"
import { Skeleton } from "./ui/skeleton"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteNav />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <SearchInput />
          </Suspense>

          <SiteMenu />
          <SiteNavSecondary />
        </div>
      </div>
    </header>
  )
}
