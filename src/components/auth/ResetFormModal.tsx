"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react"
import { ResetSchema } from "@/schemas"
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
import reset from "@/app/actions/reset"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Header from "@/components/auth/Header"

export default function ResetFormModal({
  onTypeChange,
}: {
  onTypeChange: (newType: string) => void
}) {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  const handleChangeType = () => {
    // Change the type state to "Login"
    onTypeChange("Login")
  }

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title="Forgot Password?" label="Create a new one here" />
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
                        placeholder="john.doe@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Send reset email
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="font-normal w-full"
          size="sm"
          onClick={handleChangeType}
        >
          Back to login
        </Button>
      </CardFooter>
    </Card>
  )
}
