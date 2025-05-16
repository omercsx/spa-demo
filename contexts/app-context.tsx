"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { type Locale, i18n } from "@/i18n.config"

type Theme = "light" | "dark" | "system"

interface AppContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  locale: Locale
  setLocale: (locale: Locale) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale as Locale)
  const router = useRouter()
  const pathname = usePathname()

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Initialize locale from localStorage or browser
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && i18n.locales.includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // Try to get browser locale
      const browserLocale = navigator.language.split("-")[0] as Locale
      if (i18n.locales.includes(browserLocale)) {
        setLocale(browserLocale)
      }
    }
  }, [])

  // Handle locale change
  const handleLocaleChange = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale)
    setLocale(newLocale)

    // Redirect to the same page with new locale
    if (pathname) {
      const segments = pathname.split("/")
      segments[1] = newLocale
      router.push(segments.join("/"))
    }
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        locale,
        setLocale: handleLocaleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
