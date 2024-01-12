export default function getInitials(fullName: string): string {
  const names = fullName.split(" ")
  const initials = names.map((name) => name.charAt(0).toUpperCase())
  return initials.join("")
}
