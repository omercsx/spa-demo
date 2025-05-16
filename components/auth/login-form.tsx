"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
  translations: {
    signIn: string
    email: string
    password: string
    forgotPassword: string
    noAccount: string
    signUp: string
    signInButton: string
    or: string
  }
  locale: string
}

export function LoginForm({ translations, locale }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/${locale}/dashboard`)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{translations.signIn}</CardTitle>
        <CardDescription>
          {translations.noAccount}{" "}
          <Link href={`/${locale}/signup`} className="text-primary hover:underline">
            {translations.signUp}
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{translations.email}</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{translations.password}</Label>
              <Link href={`/${locale}/forgot-password`} className="text-sm text-primary hover:underline">
                {translations.forgotPassword}
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.signInButton}...
              </>
            ) : (
              translations.signInButton
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
