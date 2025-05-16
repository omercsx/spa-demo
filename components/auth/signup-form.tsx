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

interface SignupFormProps {
  translations: {
    signUp: string
    email: string
    password: string
    confirmPassword: string
    hasAccount: string
    signIn: string
    signUpButton: string
    or: string
  }
  locale: string
}

export function SignupForm({ translations, locale }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/${locale}/dashboard`)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{translations.signUp}</CardTitle>
        <CardDescription>
          {translations.hasAccount}{" "}
          <Link href={`/${locale}/login`} className="text-primary hover:underline">
            {translations.signIn}
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
            <Label htmlFor="password">{translations.password}</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{translations.confirmPassword}</Label>
            <Input id="confirmPassword" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.signUpButton}...
              </>
            ) : (
              translations.signUpButton
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
