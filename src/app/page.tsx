import Uploader from "@/app/_components/Uploader"
import { db } from "@/lib/database"
import Instructions from "@/app/_components/instructions/Instructions"
import { Instruction } from "@/types"

export default async function Home() {
  return (
      <main className="grid grid-cols-2 gap-8 p-8 items-start container mx-auto">
        <Instructions />
        <Uploader />
      </main>
  );
}
