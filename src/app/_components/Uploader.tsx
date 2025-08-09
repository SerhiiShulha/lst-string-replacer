"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import FileCard from "@/app/_components/FileCard"
import { Input } from "@/components/ui/input"
import { ArrowRightFromLineIcon, Table } from "lucide-react"
import {
  TableBody,
  TableCaption,
  TableCell, TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Instruction {
  id: number
  name: string
  originalText: string
  replacementText: string
}

export default function Uploader() {
  const [files, setFiles] = useState<File[]>([])

  const filesUploader = useDropzone({
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
    const formData = new FormData()
    // formData.append("targetString", oldId)
    // formData.append("replacementString", newId)

    files.forEach((file: File) => {
      formData.append("files", file)
    })

    console.log(Array.from(formData.entries()))

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
    } else {
      alert("Щось пішло не так(((((")
    }
  }

  const noDataProvided = !files.length

  return (
    <div className={'space-y-8 p-8 rounded-lg bg-stone-50'}>
      <div {...filesUploader.getRootProps()}
           className={"flex justify-center items-center px-16 py-8 border-2 border-dashed border-accent rounded-md bg-white"}>
        <input {...filesUploader.getInputProps()} />
        {filesUploader.isDragActive ? (
          <p>Перенесіть файли сюди.</p>
        ) : (
          <p>Перенесіть або <Button variant={"secondary"}
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
          <Button className={"mx-auto"} disabled={noDataProvided}
                  onClick={onSubmit}>Обробити файли</Button>
        </div>
      )}


    </div>

  )
}