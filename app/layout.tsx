import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { siteConfig } from "@/config"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { GeistSans } from "geist/font/sans"
import HolyLoader from "holy-loader"

import { cn } from "@/lib/utils"
import { GridBg } from "@/components/grid-bg"
import { ScrollTop } from "@/components/scroll-top"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <GridBg />
        <HolyLoader color="#ccc" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div
            className="relative flex min-h-screen flex-col"
            vaul-drawer-wrapper=""
          >
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <TailwindIndicator />
          <ScrollTop />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.GA_ID!} />
        <Analytics />
      </body>
    </html>
  )
}
