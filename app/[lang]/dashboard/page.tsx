import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Dashboard({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">{dict.common.dashboard}</h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher
            translations={{
              english: dict.common.english,
              french: dict.common.french,
            }}
          />
          <ThemeSwitcher
            translations={{
              light: dict.common.light,
              dark: dict.common.dark,
              system: dict.common.system,
            }}
          />
          <Button asChild variant="ghost" size="sm">
            <Link href={`/${params.lang}`}>{dict.common.logout}</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">{dict.common.welcome}</h2>
        <p>This is a protected dashboard page. You would see your content here after authentication.</p>
      </main>
    </div>
  )
}
