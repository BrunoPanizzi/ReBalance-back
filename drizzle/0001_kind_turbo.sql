DO $$ BEGIN
 CREATE TYPE "feedback_type" AS ENUM('Elogios', 'Sugestão', 'Problemas', 'Outros');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" feedback_type DEFAULT 'Outros' NOT NULL,
	"message" text NOT NULL,
	"user_name" varchar(100),
	"email" varchar(200)
);
