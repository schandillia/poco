import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research",
  description: "generated by Amit",
}

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}
export default layout
