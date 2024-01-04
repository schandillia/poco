export default function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/(?<=\s)|(?<=\n)/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}
