import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server"

const Page = () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    // return <div>{user.email}</div>
    return <div>Hi!</div>
}
export default Page