import { Button } from "@/components/ui/button"
import { DeleteIcon, TrashIcon } from "lucide-react"
import { getFileSize } from "@/lib/fileSize"

interface Props {
  file: File
  onDelete: () => void
}

export default function FileCard({ file, onDelete }: Props) {
  return (
    <div className="px-4 py-2 flex justify-between items-center border-stone-100 border-solid border-1 rounded-md bg-white">
      <div>
        <p className={'text-lime-500 font-medium'}>{file.name}</p>
        <p className={'text-gray-400'}>{getFileSize(file.size)}</p>
      </div>
      <Button onClick={onDelete} variant={'outline'} size={'icon'}>
        <TrashIcon className={'text-destructive'} />
      </Button>
    </div>
  )
}