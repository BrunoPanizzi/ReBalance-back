DO $$ BEGIN
 CREATE TYPE "color" AS ENUM('orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "stock" (
	"10" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"wallet_id" uuid
);

CREATE TABLE IF NOT EXISTS "wallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"total_value" real DEFAULT 0 NOT NULL,
	"ideal_percentage" real DEFAULT 0 NOT NULL,
	"real_percentage" real DEFAULT 0 NOT NULL,
	"color" color,
	"owner" uuid
);

ALTER TABLE "user" RENAME COLUMN "user-name" TO "user_name";
DO $$ BEGIN
 ALTER TABLE "stock" ADD CONSTRAINT "stock_wallet_id_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "wallet" ADD CONSTRAINT "wallet_owner_user_uid_fk" FOREIGN KEY ("owner") REFERENCES "user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
