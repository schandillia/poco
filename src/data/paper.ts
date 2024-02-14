import { db } from "@/lib/db"

export const getPaperById = async (id: string) => {
  try {
    const paper = await db.paper.findUnique({
      where: { id },
    })
    return paper
  } catch {
    return null
  }
}
