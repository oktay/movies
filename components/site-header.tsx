"use client"

import Link from "next/link"
import { siteConfig } from "@/config"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SiteNav } from "@/components/site-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteNav />

        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center space-x-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                })}
              >
                <Icons.Github className="size-4 fill-current lg:mr-2" />
                <span className="sr-only lg:not-sr-only">Source code</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
