import { ComponentProps } from "react"
import { siteConfig } from "@/config"

import { Icons } from "@/components/icons"

export const SiteFooter: React.FC<ComponentProps<"footer">> = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t py-4">
      <div className="container flex flex-col items-center text-center lg:flex-row lg:justify-between">
        <div className="order-1 mt-4 text-muted-foreground lg:order-none lg:mt-0">
          <p>
            &copy; {year}{" "}
            <a
              href={siteConfig.author.web}
              target="_blank"
              rel="noreferrer"
              className="text-foreground"
            >
              {siteConfig.author.name}
            </a>{" "}
            <br className="lg:hidden" />
            All rights reserved.
          </p>
        </div>

        <div className="mt-4 text-sm text-muted-foreground lg:mt-0 lg:text-right">
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div>
              <p>
                Made with{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  className="text-foreground"
                >
                  <Icons.Next className="mr-1 inline size-4 fill-current align-middle" />
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  className="text-foreground"
                >
                  <Icons.Shadcn className="mr-1 inline size-4 fill-current align-middle" />
                  shadcn/ui
                </a>
              </p>

              <p>
                Powered by{" "}
                <a
                  href="//vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground"
                >
                  <Icons.Vercel className="mr-1 inline size-3 fill-current align-middle" />
                  Vercel
                </a>{" "}
                <br className="lg:hidden" />
                Data provided by{" "}
                <a
                  href="//themoviedb.org"
                  target="_blank"
                  className="text-foreground"
                  rel="noreferrer"
                >
                  The Movie Database
                </a>
              </p>
              <p className="mt-4 text-xs lg:mt-0">
                This project uses the{" "}
                <a
                  href="//themoviedb.org/documentation/api"
                  target="_blank"
                  className="text-foreground"
                  rel="noreferrer"
                >
                  The Movie Database API
                </a>{" "}
                but is not endorsed or certified by{" "}
                <a
                  href="//themoviedb.org"
                  target="_blank"
                  className="text-foreground"
                  rel="noreferrer"
                >
                  TMDB
                </a>
              </p>
            </div>

            <a href="//themoviedb.org" target="_blank" rel="noreferrer">
              <Icons.Tmdb className="size-16 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
