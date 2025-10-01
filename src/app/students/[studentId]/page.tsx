import React from 'react'
import NewResourceModal from "../../components/newResourceModal/newResourceModal";
import StudentCard from "../../components/StudentCard/studentCard";
import { student } from "@/drizzle/schema/student";
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

const classroom = async ({params}: {
    params: Promise<{ studentId: string }>
}) => {
  const studentId = (await params).studentId;
  const db = drizzle(process.env.DATABASE_URL as string);
  const currentStudent = await db.select().from(student).where(eq(student.id, Number(studentId))).then(rows => rows[0]);

  return (
    <main>
        <section className="px-(--pageBodyPadding)">
          <div className="flex justify-between mt-5 mb-20">
            <h1>{currentStudent.firstName} {currentStudent.lastName}</h1>
          </div>
      </section>
    </main>
  )
}

export default classroom