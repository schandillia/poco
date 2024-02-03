import { Icons } from "@/components/commons/Icons"
import CardWrapper from "@/components/auth/CardWrapper"

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      headerTitle="Authentication error"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <Icons.Alert className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
