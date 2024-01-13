import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New verification",
  description: "generated by Amit",
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
      {children}
    </div>
  )
}
export default layout
