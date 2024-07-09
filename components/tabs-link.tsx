"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { TabsTrigger } from "@/components/ui/tabs"

interface TabsLinkProps {
  href: string
  children: React.ReactNode
}

export const TabsLink: React.FC<TabsLinkProps> = ({ href, children }) => {
  const pathname = usePathname()

  return (
    <TabsTrigger
      data-state={pathname === href ? "active" : "inactive"}
      value={href}
      asChild
    >
      <Link href={href} prefetch={false} scroll={false}>
        {children}
      </Link>
    </TabsTrigger>
  )
}
