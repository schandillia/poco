"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react"
import { Icons } from "@/components/Icons"
import { RegisterSchema } from "@/schemas"
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
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
import register from "@/app/actions/register"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Header from "@/components/auth/Header"
import Social from "@/components/auth/Social"

export default function RegisterFormModal({
  onTypeChange,
}: {
  onTypeChange: (newType: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  const handleChangeType = () => {
    // Change the type state to "Login"
    onTypeChange("Login")
  }

  const showSocial = true

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title="Register" label="Create an account" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                        placeholder="your@email.com"
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
                            <Icons.Hide onClick={() => setShowPassword(true)} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          value={field.value || ""}
                        />
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400">
                          {showPassword ? (
                            <Icons.Show
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <Icons.Hide onClick={() => setShowPassword(true)} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Register
              {isPending && (
                <Icons.SmoothLoader className="h-4 w-4 ml-4 animate-spin" />
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
        <Button
          variant="link"
          size="sm"
          className="w-full font-normal"
          onClick={handleChangeType}
        >
          Already have an account?
        </Button>
      </CardFooter>
    </Card>
  )
}