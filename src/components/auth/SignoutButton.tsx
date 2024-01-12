"use client"

import logout from "@/app/actions/logout"

export default function SignoutButton() {
  const handleSignout = () => {
    logout()
  }

  return (
    <button type="submit" onClick={handleSignout}>
      Sign out
    </button>
  )
}
