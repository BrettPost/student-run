CREATE TABLE "student" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "student_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"first_name" varchar NOT NULL,
	"last_name" varchar,
	"grade" integer,
	"teacher_id" bigint
);
--> statement-breakpoint
CREATE TABLE "teacher" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teacher_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"first_name" varchar,
	"last_name" varchar NOT NULL,
	"grade" integer
);
--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_teacher_id_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON DELETE no action ON UPDATE no action;