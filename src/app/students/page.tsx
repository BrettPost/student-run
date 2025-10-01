import NewResourceModal from "../components/newResourceModal/newResourceModal";
import StudentCard from "../components/StudentCard/studentCard";
import { student } from "@/drizzle/schema/student";
import { drizzle } from 'drizzle-orm/node-postgres';



const allStudents = async () => {
const db = drizzle(process.env.DATABASE_URL as string);
const students = await db.select().from(student);

  return (
    <main>
        <section className="px-(--pageBodyPadding)">
          <div className="flex justify-between mt-5 mb-20">
            <h1>Classrooms</h1>
            <NewResourceModal />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 place-items-center">
            {students.map((s) => <article key={s.id}><StudentCard student={s}/></article>)}
          </div>
      </section>
    </main>
  )
}

export default allStudents