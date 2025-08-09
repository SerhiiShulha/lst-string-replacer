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
    <div className={'p-6 rounded-lg bg-stone-50 space-y-8'}>
      <InstructionsTable instructions={instructions} />
      <InstructionsUploader />
    </div>
  )
}