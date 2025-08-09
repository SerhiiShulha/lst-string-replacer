import JSZip from "jszip"
import { NextRequest, NextResponse } from "next/server"
import {db} from "../../../lib/database"
import { Instruction } from "@/types"

export async function POST (req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  const zip = new JSZip()

  const instructions = db.prepare('SELECT * FROM instructions').all() as Instruction[]

  for (const file of files) {
    const content = await file.text()

    for (const instruction of instructions) {
      const occurrences = (content.match(new RegExp(instruction.original_text, 'g')) || []).length

      console.log(`${file.name}: ${occurrences} times ${instruction.original_text} -> ${instruction.replacement_text}`)
      content.replaceAll(instruction.original_text, instruction.replacement_text)
    }

    zip.file(file.name, content);
  }

  const zipData = await zip.generateAsync({ type: 'uint8array' }) as BlobPart
  const blob = new Blob([zipData], { type: "application/zip" })

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="modified_files.zip"',
    }
  })
}