"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { TabsTrigger } from "@/components/ui/tabs"

interface TabsLinkProps {
  href: string
  children: React.ReactNode
}

export const TabsLink = ({ href, children }: TabsLinkProps) => {
  const pathname = usePathname()

  return (
    <TabsTrigger
      data-state={pathname === href ? "active" : "inactive"}
      value={href}
      asChild
    >
      <Link href={href} prefetch={false}>
        {children}
      </Link>
    </TabsTrigger>
  )
}
