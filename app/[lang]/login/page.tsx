import { LoginForm } from "@/components/auth/login-form"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n.config"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default async function LoginPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-end">
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
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm translations={dict.auth} locale={params.lang} />
      </main>
    </div>
  )
}
