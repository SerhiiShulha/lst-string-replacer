"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import FileCard from "@/app/_components/FileCard"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

export default function Uploader() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const filesUploader = useDropzone({
    disabled: isProcessing,
    noClick: true,
    maxFiles: 20,
    accept: {
      "text/plain": [".lst"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(prevState => [...prevState, ...acceptedFiles])
    },
  })

  const onDeleteFile = (index: number) => {
    setFiles(prevState => prevState.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {


    try {
      setIsProcessing(true)
      const formData = new FormData()
      files.forEach((file: File) => {
        formData.append("files", file)
      })
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "modified_files.zip"
        a.click()
        window.URL.revokeObjectURL(url)
        setFiles([])
      } else {
        alert("Щось пішло не так(((((")
      }
    } catch {
      toast.error("Помилка", {
        description: "Сервер не може обробити файл(и)",
        position: "bottom-right"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const noDataProvided = !files.length

  return (
    <div className={'space-y-8 p-8 rounded-lg bg-stone-50'}>
      <h3 className={'font-medium text-lg mb-4 text-center'}>Оберіть .lst файли</h3>
      <div {...filesUploader.getRootProps()}
           className={"flex justify-center items-center px-16 py-8 border-2 border-dashed border-accent rounded-md bg-white"}>
        <input {...filesUploader.getInputProps()} disabled={isProcessing} />
        {filesUploader.isDragActive ? (
          <p>Перенесіть файли сюди.</p>
        ) : (
          <p>Перенесіть або <Button variant={"secondary"} disabled={isProcessing}
                                    onClick={() => filesUploader.open()}>Оберіть</Button> файли...
          </p>
        )}
      </div>
      {!!files.length && (
        <div className={"w-full flex flex-col gap-4"}>
          <div className="space-y-2">
            {files.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onDelete={() => onDeleteFile(index)}
              />
            ))}
          </div>
          <Button className={"mx-auto"} disabled={noDataProvided || isProcessing}
                  onClick={onSubmit}>
            {isProcessing && <Loader2Icon className="animate-spin"/>}
            Обробити файли
          </Button>
        </div>
      )}


    </div>

  )
}