import { ComponentProps } from "react"
import { siteConfig } from "@/config"

export const SiteFooter: React.FC<ComponentProps<"footer">> = () => {
  return (
    <footer className="mt-12 border-t py-4">
      <div className="container flex flex-col items-center justify-between lg:flex-row lg:items-start lg:justify-between">
        <div className="text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={siteConfig.author.web}
            target="_blank"
            rel="noreferrer"
            className="text-foreground"
          >
            {siteConfig.author.name}
          </a>{" "}
          All rights reserved.
        </div>

        <div className="text-sm text-muted-foreground">
          This project uses the{" "}
          <a
            href={siteConfig.links.tmdb}
            target="_blank"
            className="text-foreground"
            rel="noreferrer"
          >
            The Movie Database API
          </a>{" "}
          but is not endorsed or certified by{" "}
          <a
            href={siteConfig.links.tmdb}
            target="_blank"
            className="text-foreground"
            rel="noreferrer"
          >
            TMDB
          </a>
        </div>
      </div>
    </footer>
  )
}
