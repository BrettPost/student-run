import { integer, varchar, pgTable, bigint } from "drizzle-orm/pg-core";

export type Teacher = typeof teacher.$inferSelect;

export const teacher = pgTable('teacher', {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name").notNull(),
    grade: integer()
})