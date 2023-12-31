import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import Dashboard from "@/components/Dashboard"
import { db } from "@/db"
// import { getUserSubscriptionPlan } from "@/lib/stripe"

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

  /*
        user returns the following:
        email
        family_name
        given_name
        id
        picture
    */

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) redirect("/auth-callback?origin=dashboard")

  return <Dashboard />
}

export default Page
