DO $$ BEGIN
 CREATE TYPE "public"."login_type" AS ENUM('EMAIL', 'FACEBOOK', 'GOOGLE', 'TWITTER', 'LINKEDIN', 'GITHUB');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uid" uuid DEFAULT gen_random_uuid(),
	"email" varchar(50) NOT NULL,
	"password" varchar(100),
	"first_name" varchar(50),
	"last_name" varchar(50),
	"img_url" varchar(255),
	"login_type" "login_type",
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "users_user_uid_unique" UNIQUE("user_uid")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_login_type_index" ON "users" ("email","login_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_login_type_index" ON "users" ("login_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_is_deleted_index" ON "users" ("is_deleted");