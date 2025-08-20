"use client"

import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { registerInstructions } from "@/lib/actions/instructions"
import { useState } from "react"
import { toast } from "sonner"

export default function InstructionsUploader() {
  const [isProcessing, setIsProcessing] = useState(false)
  const uploader = useDropzone({
    disabled: isProcessing,
    noClick: true,
    maxFiles: 1,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length) return

      try {
        setIsProcessing(true)
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])

        await registerInstructions(formData)
      } catch {
        toast.error("Помилка", {
          description: "Сервер не може обробити файл(и)",
          position: "bottom-right"
        })
      } finally {
        setIsProcessing(false)
      }
    },
  })
  return (

      <div {...uploader.getRootProps()}
           className={"flex justify-center items-center px-16 py-8 border-2 border-dashed border-accent rounded-md bg-white"}>
        <input {...uploader.getInputProps()} disabled={isProcessing} />
        {uploader.isDragActive ? (
          <p>Перенесіть файли сюди.</p>
        ) : (
          <p>Перенесіть або <Button variant={"secondary"} disabled={isProcessing}
                                    onClick={() => uploader.open()}>Оберіть</Button> файли...
          </p>
        )}
      </div>
  )
}