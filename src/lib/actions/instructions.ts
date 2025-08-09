'use server'

import xlsx from "node-xlsx"
import { db } from "@/lib/database"
import { revalidatePath } from "next/cache"

export async function registerInstructions(formData: FormData) {
  const file = formData.get("file") as File;

  const fileBuffer = await file.arrayBuffer()
  try{
    const workbook = xlsx.parse(Buffer.from(fileBuffer))

    const firstSheet = workbook[0];

    if (!firstSheet || !firstSheet.data) {
      throw new Error('Файл не містить даних');
    }

    const truncateTableQuery = db.prepare('DELETE FROM instructions')
    const query = db.prepare('INSERT INTO instructions (name, original_text, replacement_text) VALUES (@name, @original_text, @replacement_text)')

    const insertMany = db.transaction((instructions) => {
      truncateTableQuery.run()
      for (const instruction of instructions) query.run(instruction)
    })

    insertMany(firstSheet.data.map(row => {
      const [name, original_text, replacement_text] = row;

      return {name, original_text, replacement_text}
    }))
  } catch (e) {
    console.error(e)
    throw e
  }

  revalidatePath("/")

  return {success: true}
}