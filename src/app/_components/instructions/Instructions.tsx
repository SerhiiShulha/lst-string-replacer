import { db } from "@/lib/database"
import InstructionsUploader
  from "@/app/_components/instructions/InstructionsUploader"
import InstructionsTable from "@/app/_components/instructions/InstructionsTable"
import { Instruction } from "@/types"

const getInstructions = async () => {
  const instructions = db.prepare('SELECT * FROM instructions').all() as Instruction[]
  return {instructions}
}

export default async function Instructions() {
  const {instructions} = await getInstructions()

  return (
    <div className={'p-8 rounded-lg bg-stone-50 space-y-8'}>
      <h3 className={'font-medium text-lg mb-4 text-center'}>Поточні інструкції ({instructions.length})</h3>
      <InstructionsTable instructions={instructions} />
      <InstructionsUploader />
    </div>
  )
}