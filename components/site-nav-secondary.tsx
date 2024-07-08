import Link from "next/link"
import { siteConfig } from "@/config"

import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { buttonVariants } from "./ui/button"

export const SiteNavSecondary = () => {
  return (
    <nav className="hidden items-center space-x-2 lg:flex">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <Icons.Github className="size-4 fill-current xl:mr-2" />
          <span className="sr-only xl:not-sr-only">Source code</span>
        </div>
      </Link>
      <ThemeToggle />
    </nav>
  )
}
