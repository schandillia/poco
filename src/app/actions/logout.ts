"use server"

import { signOut } from "@/auth"

const logout = async () => {
  // Perform pre-signout housekeeping activities here
  await signOut()
}
export default logout
