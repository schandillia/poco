import { useSession } from "next-auth/react"

const useCurentUser = () => {
  const session = useSession()
  return session.data?.user
}
export default useCurentUser
