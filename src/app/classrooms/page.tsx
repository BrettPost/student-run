import NewResourceModal from "../components/newResourceModal/newResourceModal";
import ClassroomCard from "../components/ClassroomCard/classroomCard";
import { teacher } from "@/drizzle/schema/teacher";
import { drizzle } from 'drizzle-orm/node-postgres';



const allClassrooms = async () => {
const db = drizzle(process.env.DATABASE_URL as string);
const teachers = await db.select().from(teacher);

  return (
    <section>
      <h1>Classrooms</h1>
      <NewResourceModal />
      {teachers.map((teach) => <article key={teach.id}><ClassroomCard teacher={teach}/></article>)}
    </section>
  )
}

export default allClassrooms