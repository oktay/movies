"use client"

import Link from "next/link"
import { NavItem, navigation, siteConfig } from "@/config"
import { useDialog } from "@/hooks"
import { Bug, MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export const SiteMenu = () => {
  const [open, setOpen] = useDialog()

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <Accordion type="multiple" className="px-2">
          {navigation.items.map((item) =>
            item.items ? (
              <MultipleMenuItem key={item.title} {...item} />
            ) : (
              <MenuItem key={item.title} {...item} />
            )
          )}
        </Accordion>

        <Separator className="mt-4" />

        <DrawerFooter>
          <nav className="flex gap-2">
            <Link
              href={siteConfig.links.github}
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.Github className="mr-2 size-4 fill-current" />
              <span>Source code</span>
            </Link>

            <a
              href={siteConfig.links.github + "/issues"}
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bug className="mr-2 inline size-4 align-middle" />
              Submit a bug
            </a>
          </nav>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const MenuItem = ({ title, href, icon: Icon }: NavItem) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full justify-between hover:no-underline"
      )}
    >
      <div className={cn("flex items-center justify-start")}>
        <Icon className="mr-2 size-4" />
        {title}
      </div>
    </Link>
  )
}

const MultipleMenuItem = ({ title, items, icon: Icon }: NavItem) => {
  return (
    <AccordionItem className="border-b-0" value={title}>
      <AccordionTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-between hover:no-underline"
        )}
      >
        <div className={cn("flex items-center justify-start")}>
          <Icon className="mr-2 size-4" />
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
