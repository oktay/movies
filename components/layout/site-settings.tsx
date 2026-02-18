"use client"

import React from "react"
import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import { SettingsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InfoTooltip } from "@/components/shared/info-tooltip"
import { RegionSelect } from "@/components/shared/region-select"
import { ThemeToggle } from "@/components/shared/theme-toggle"

const SiteSettingsButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "outline", size = "icon", className, children, ...props },
    ref
  ) => {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("shrink-0", className)}
        ref={ref}
        {...props}
      >
        <SettingsIcon className="size-4" />
        <span className="sr-only">Settings</span>
      </Button>
    )
  }
)

SiteSettingsButton.displayName = "SiteSettingsButton"

interface SiteSettingsWrapperProps {
  children: React.ReactNode
}

export const SiteSettingsWrapper: React.FC<SiteSettingsWrapperProps> = ({
  children,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return (
      <Drawer shouldScaleBackground={false}>
        <DrawerTrigger asChild>
          <SiteSettingsButton />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>{children}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <SiteSettingsButton />
        </PopoverTrigger>
        <PopoverContent className="space-y-4" align="end">
          <h5>Settings</h5>
          <div>{children}</div>
        </PopoverContent>
      </Popover>
    )
  }
}

interface SiteSettingsProps {
  region?: string
}

export const SiteSettings: React.FC<SiteSettingsProps> = ({
  region = "US",
}) => {
  return (
    <SiteSettingsWrapper>
      <div
        className="mt-2 space-y-2"
        onFocusCapture={(e) => {
          e.stopPropagation()
        }}
      >
        <Label className="flex items-center text-xs text-muted-foreground">
          <span className="mr-1">Region</span>
          <InfoTooltip className="w-60">
            This setting will use for showing the available watch providers in
            your region.
          </InfoTooltip>
        </Label>
        <RegionSelect value={region} />
      </div>

      <div className="mt-4 space-y-2">
        <Label className="text-xs text-muted-foreground">Theme</Label>
        <ThemeToggle />
      </div>
    </SiteSettingsWrapper>
  )
}
