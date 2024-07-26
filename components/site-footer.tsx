import { ComponentProps } from "react"
import Link from "next/link"
import { navigation, siteConfig } from "@/config"
import { Bug } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const SiteFooter: React.FC<ComponentProps<"footer">> = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-12 border-t bg-background">
      <div className="container flex flex-col lg:flex-row">
        <div className="px-2 py-8 pt-12 text-muted-foreground md:p-12">
          <Icons.Logo className="size-8" />
        </div>

        <div className="flex-1 p-12 px-2 py-8 md:p-12">
          <div className="mb-24 hidden md:flex">
            {navigation.items.slice(1, navigation.items.length).map((item) => (
              <ul className="flex-1" key={item.title}>
                <p className="mb-4 text-muted-foreground">{item.title}</p>
                {item.items?.map((subitem) => (
                  <li className="mb-2 text-sm" key={subitem.href}>
                    <Link href={subitem.href} prefetch={false}>
                      {subitem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-12 xl:flex-row xl:items-center">
            <div className="text-sm text-muted-foreground">
              <p>
                &copy; {year}{" "}
                <a
                  href={siteConfig.author.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  {siteConfig.author.name}
                </a>{" "}
                &mdash; All rights reserved.
              </p>
              <p>
                Built with{" "}
                <a
                  href={siteConfig.links.next}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  <Icons.Next className="inline size-3 fill-current align-middle" />{" "}
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href={siteConfig.links.shadcn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  <Icons.Shadcn className="inline size-3 fill-current align-middle" />{" "}
                  shadcn/ui
                </a>
                . Powered by{" "}
                <a
                  href={siteConfig.links.vercel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  <Icons.Vercel className="inline size-3 fill-current align-middle" />{" "}
                  Vercel
                </a>
                .
              </p>

              <p className="mt-8">
                Data provided by{" "}
                <a
                  href={siteConfig.links.tmdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  TMDB
                </a>
                .
              </p>
            </div>

            <div className="hidden gap-2 md:flex">
              <a
                href={siteConfig.links.github}
                className={buttonVariants({ variant: "outline" })}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icons.Github className="inline size-4 fill-current align-middle md:mr-2" />
                <span className="sr-only md:not-sr-only">Source code</span>
              </a>

              <a
                href={siteConfig.links.github + "/issues"}
                className={buttonVariants({ variant: "outline" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Bug className="inline size-4 align-middle md:mr-2" />
                <span className="sr-only md:not-sr-only">Submit a bug</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
