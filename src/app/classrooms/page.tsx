import NewResourceModal from "../components/newResourceModal/newResourceModal";
import ClassroomCard from "../components/ClassroomCard/classroomCard";
import { teacher } from "@/drizzle/schema/teacher";
import { drizzle } from 'drizzle-orm/node-postgres';



const allClassrooms = async () => {
const db = drizzle(process.env.DATABASE_URL as string);
const teachers = await db.select().from(teacher);

  return (
    <main>
        <section className="px-(--pageBodyPadding)">
          <div className="flex justify-between mt-5 mb-20">
            <h1>Classrooms</h1>
            <NewResourceModal />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 place-items-center">
            {teachers.map((teach) => <article key={teach.id}><ClassroomCard teacher={teach}/></article>)}
          </div>
      </section>
    </main>
  )
}

export default allClassrooms