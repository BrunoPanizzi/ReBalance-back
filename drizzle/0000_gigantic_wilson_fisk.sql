CREATE TABLE IF NOT EXISTS "user" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user-name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL
);
