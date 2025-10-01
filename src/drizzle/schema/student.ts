import { integer, varchar, pgTable, bigint } from "drizzle-orm/pg-core";
import { teacher } from "./teacher"

export type Student = typeof student.$inferSelect;

export const student = pgTable('student', {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name"),
    grade: integer(),
    teacherId: bigint("teacher_id", {mode: "number"}).references(() => teacher.id)
})