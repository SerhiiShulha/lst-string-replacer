"use client"

import { useDropzone } from "react-dropzone"
import { Instruction } from "@/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { registerInstructions } from "@/lib/actions/instructions"

export default function InstructionsUploader() {
  const uploader = useDropzone({
    noClick: true,
    maxFiles: 1,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length) return

      try {
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])

        await registerInstructions(formData)
      } catch (e) {
        alert("Щось пішло не так")
      }

    },
  })
  return (

      <div {...uploader.getRootProps()}
           className={"flex justify-center items-center px-16 py-8 border-2 border-dashed border-accent rounded-md bg-white"}>
        <input {...uploader.getInputProps()} />
        {uploader.isDragActive ? (
          <p>Перенесіть файли сюди.</p>
        ) : (
          <p>Перенесіть або <Button variant={"secondary"}
                                    onClick={() => uploader.open()}>Оберіть</Button> файли...
          </p>
        )}
      </div>
  )
}