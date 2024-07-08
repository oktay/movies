"use client"

import Link from "next/link"
import { NavItem, navigation, siteConfig } from "@/config"
import { useDialog } from "@/hooks"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Button, buttonVariants } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

const itemStyle = cn(
  buttonVariants({
    variant: "ghost",
  }),
  "w-full justify-between hover:no-underline"
)

const linkStyle = cn("flex items-center justify-start")

export const SiteMenu = () => {
  const [open, setOpen] = useDialog()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline" className="shrink-0 lg:hidden">
          <MenuIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Accordion type="multiple">
            {navigation.items.map(({ title, items, href, icon: Icon }) =>
              items ? (
                <MultipleMenuItem
                  key={title}
                  href={href}
                  title={title}
                  items={items}
                  icon={Icon}
                />
              ) : (
                <MenuItem href={href} key={title} title={title} icon={Icon} />
              )
            )}
          </Accordion>
          <SecondaryMenu />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const MenuItem = ({ title, href, icon: Icon }: NavItem) => {
  return (
    <Link href={href} className={itemStyle}>
      <div className={linkStyle}>
        <Icon className="mr-2 size-3" />
        {title}
      </div>
    </Link>
  )
}

const MultipleMenuItem = ({ title, items, icon: Icon }: NavItem) => {
  return (
    <AccordionItem className="border-b-0" value={title}>
      <AccordionTrigger className={itemStyle}>
        <div className={linkStyle}>
          <Icon className="mr-2 size-3" />
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-4">
        {items?.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

const SecondaryMenu = () => (
  <nav className="flex gap-2 border-t py-4">
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "flex-1"
      )}
    >
      <Icons.Github className="mr-2 size-4 fill-current" />
      <span>Source code</span>
    </Link>
    <ThemeToggle />
  </nav>
)
