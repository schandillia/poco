// import Dashboard from "@/components/Dashboard"
import { db } from "@/db"
// import { getUserSubscriptionPlan } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    // email
    // family_name
    // given_name
    // id
    // picture
    return <p>Hi {user?.given_name} {user?.family_name}!</p>;
};

export default Page