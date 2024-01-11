const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
      {children}
    </div>
  )
}
export default layout
