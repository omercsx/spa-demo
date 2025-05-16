"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Laptop } from "lucide-react"

interface ThemeSwitcherProps {
  translations: {
    light: string
    dark: string
    system: string
  }
}

export function ThemeSwitcher({ translations }: ThemeSwitcherProps) {
  const { theme, setTheme } = useAppContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === "light" && <Sun className="h-5 w-5" />}
          {theme === "dark" && <Moon className="h-5 w-5" />}
          {theme === "system" && <Laptop className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent font-medium" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          {translations.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-accent font-medium" : ""}>
          <Moon className="mr-2 h-4 w-4" />
          {translations.dark}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent font-medium" : ""}
        >
          <Laptop className="mr-2 h-4 w-4" />
          {translations.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
