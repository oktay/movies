import Link from "next/link"
import { siteConfig } from "@/config"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export const SiteSubnav = () => {
  return (
    <nav className="hidden items-center space-x-2 lg:flex">
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
        prefetch={false}
      >
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
