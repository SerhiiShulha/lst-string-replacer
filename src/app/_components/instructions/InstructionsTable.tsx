import { Instruction } from "@/types"
import {
  Table,
  TableBody,
  TableCaption, TableCell, TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export default function InstructionsTable({instructions}: {instructions: Instruction[]}) {
  return (
    !!instructions.length && (
      <div>
        <Table>
          <TableHeader>
            <TableRow className={'font-medium'}>
              <TableCell>
                Імʼя
              </TableCell>
              <TableCell>
                Старе значення
              </TableCell>
              <TableCell>
                Нове значення
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructions.map((instruction) => (
              <TableRow key={instruction.id}>
                <TableCell>
                  {instruction.name}
                </TableCell>
                <TableCell>
                  {instruction.original_text}
                </TableCell>
                <TableCell>
                  {instruction.replacement_text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
  )
}