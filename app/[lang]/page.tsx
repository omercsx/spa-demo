import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{dict.common.appName}</h1>
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
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{dict.home.title}</h1>
        <p className="text-xl mb-8 max-w-md">{dict.home.subtitle}</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={`/${params.lang}/login`}>{dict.auth.signIn}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${params.lang}/signup`}>{dict.auth.signUp}</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
