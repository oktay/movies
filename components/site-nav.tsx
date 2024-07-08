"use client"

import { forwardRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem, navigation, siteConfig } from "@/config"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Icons } from "./icons"

export const SiteNav: React.FC<React.ComponentProps<"div">> = () => {
  const pathname = usePathname()
  const items = navigation.items

  function isActive(href: string) {
    const isHomePage = href === "/"
    if (isHomePage) {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex gap-4">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.Logo className="size-6" />
        <span className="sr-only">{siteConfig.name}</span>
      </Link>

      {items && (
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {items.map(
              ({ title, icon: Icon, items: sub, href, description }, index) =>
                sub ? (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger
                      className={cn(isActive(href) && "bg-muted")}
                    >
                      {Icon && <Icon className="mr-2 size-4" />}
                      {title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-6 pb-0">
                        <h3 className="flex items-center text-lg font-medium">
                          {Icon && <Icon className="mr-2 size-4" />}
                          {title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {sub?.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            icon={component.icon}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={index}>
                    <Link href={href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive(href) && "bg-muted"
                        )}
                      >
                        {Icon && <Icon className="mr-2 size-4" />}
                        {title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & NavItem
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex text-sm font-medium leading-none">
            {Icon && <Icon className="mr-2 size-3" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
