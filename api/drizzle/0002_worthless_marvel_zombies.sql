ALTER TABLE "projects" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "todos_props" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos_props" ADD CONSTRAINT "todos_props_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "todos_props" ADD CONSTRAINT "todos_props_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_user_id_unique" UNIQUE("user_id");