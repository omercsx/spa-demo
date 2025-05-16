"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { i18n, type Locale } from "@/i18n.config"

interface LanguageSwitcherProps {
  translations: {
    english: string
    french: string
  }
}

export function LanguageSwitcher({ translations }: LanguageSwitcherProps) {
  const { locale, setLocale } = useAppContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l as Locale)}
            className={locale === l ? "bg-accent font-medium" : ""}
          >
            {l === "en" ? translations.english : translations.french}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
