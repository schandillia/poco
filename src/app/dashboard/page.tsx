import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Page = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return <p>Hi {user?.given_name} {user?.family_name}!</p>;
};

export default Page