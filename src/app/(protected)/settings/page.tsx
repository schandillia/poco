"use client"

import logout from "@/app/actions/logout"
import useCurentUser from "@/app/hooks/use-current-user"

const page = () => {
  const user = useCurentUser()
  const onClick = () => {
    logout()
  }

  return (
    <div>
      {JSON.stringify(user)}
      <form>
        <button type="submit" onClick={onClick}>
          Sign out
        </button>
      </form>
    </div>
  )
}
export default page
