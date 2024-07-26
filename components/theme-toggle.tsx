"use client"

import * as React from "react"
import { MonitorCog, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme, themes } = useTheme()

  const iconProps = {
    className: "size-4 mr-2",
  }

  return (
    <div className="flex flex-col gap-2">
      {themes.map((value) => (
        <Button
          variant={theme === value ? "default" : "outline"}
          onClick={() => setTheme(value)}
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
