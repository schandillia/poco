import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

// const Page = () => {
//     const {getUser} = getKindeServerSession()
//     const user = getUser()

//     return <div>Hello {user.givenName}</div>
// }

const Page = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return <p>Hi {user?.given_name} {user?.family_name}!</p>;
};

export default Page