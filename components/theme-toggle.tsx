"use client"

import * as React from "react"
import { MonitorCog, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ThemeToggle() {
  const { setTheme, theme, themes } = useTheme()
  const { toast } = useToast()

  const iconProps = {
    className: "size-4 mr-2",
  }

  function handleClick(value: string) {
    setTheme(value)
    toast({
      title: "Theme changed successfully",
      description: `You have
        successfully changed the theme to ${value}`,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {themes.map((value) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "outline"}
          onClick={() => handleClick(value)}
        >
          {value === "light" && <Sun {...iconProps} />}
          {value === "dark" && <Moon {...iconProps} />}
          {value === "system" && <MonitorCog {...iconProps} />}

          <span className="capitalize">{value}</span>
        </Button>
      ))}
    </div>
  )
}
