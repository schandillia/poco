"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Icons } from "@/components/commons/Icons"
import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import FormError from "@/components/commons/FormError"
import FormSuccess from "@/components/commons/FormSuccess"
import login from "@/app/actions/login"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Header from "@/components/auth/Header"
import Social from "@/components/auth/Social"

export default function LoginFormModal({
  onTypeChange,
}: {
  onTypeChange: (newType: string) => void
}) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callback")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : ""

  const [showPassword, setShowPassword] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      const currentUrl = `/${window.location.href
        .split("/")
        .slice(3)
        .join("/")}` // Get the current URL slug
      const originUrl = callbackUrl !== null ? callbackUrl : currentUrl
      login(values, originUrl)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError("Something went wrong"))
    })
  }

  const ChangeTypeToRegister = () => {
    // Change the type state to "Register"
    onTypeChange("Register")
  }
  const ChangeTypeToReset = () => {
    // Change the type state to "Register"
    onTypeChange("Reset")
  }

  const showSocial = true

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title="Login" label="Welcome back" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Passcode</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@email.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="********"
                              type={showPassword ? "text" : "password"}
                            />
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400">
                              {showPassword ? (
                                <Icons.Show
                                  onClick={() => setShowPassword(false)}
                                />
                              ) : (
                                <Icons.Hide
                                  onClick={() => setShowPassword(true)}
                                />
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 font-normal"
                          onClick={ChangeTypeToReset}
                        >
                          Forgot password?
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              {showTwoFactor ? "Confirm" : "Login"}
              {isPending && (
                <Icons.ButtonLoader className="h-4 w-4 ml-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {/* If not modal, make this button route to /auth/register */}
        <Button
          variant="link"
          size="sm"
          className="w-full font-normal"
          onClick={ChangeTypeToRegister}
        >
          Don’t have an account?
        </Button>
      </CardFooter>
    </Card>
  )
}
