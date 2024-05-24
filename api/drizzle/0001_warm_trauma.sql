CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"project_uuid" uuid DEFAULT gen_random_uuid(),
	"name" varchar(100),
	"description" varchar(255),
	"is_archived" boolean DEFAULT false,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "projects_workspace_id_unique" UNIQUE("workspace_id"),
	CONSTRAINT "projects_project_uuid_unique" UNIQUE("project_uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"todo_id" integer NOT NULL,
	"sub_todo_uuid" uuid DEFAULT gen_random_uuid(),
	"todo_props_id" integer NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "sub_todos_todo_id_unique" UNIQUE("todo_id"),
	CONSTRAINT "sub_todos_sub_todo_uuid_unique" UNIQUE("sub_todo_uuid"),
	CONSTRAINT "sub_todos_todo_props_id_unique" UNIQUE("todo_props_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos_props" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"todo_props_uuid" uuid DEFAULT gen_random_uuid(),
	"start_date" date DEFAULT now(),
	"end_date" date,
	"is_completed" boolean DEFAULT false,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "todos_props_project_id_unique" UNIQUE("project_id"),
	CONSTRAINT "todos_props_todo_props_uuid_unique" UNIQUE("todo_props_uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"todo_uuid" uuid DEFAULT gen_random_uuid(),
	"todo_props_id" integer NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "todos_project_id_unique" UNIQUE("project_id"),
	CONSTRAINT "todos_todo_uuid_unique" UNIQUE("todo_uuid"),
	CONSTRAINT "todos_todo_props_id_unique" UNIQUE("todo_props_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_uuid" uuid DEFAULT gen_random_uuid(),
	"name" varchar(100),
	"description" varchar(255),
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"updated_by" varchar(32) NOT NULL,
	"deleted_by" varchar(32),
	CONSTRAINT "workspaces_workspace_uuid_unique" UNIQUE("workspace_uuid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_todos" ADD CONSTRAINT "sub_todos_todo_id_todos_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_todos" ADD CONSTRAINT "sub_todos_todo_props_id_todos_props_id_fk" FOREIGN KEY ("todo_props_id") REFERENCES "public"."todos_props"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos_props" ADD CONSTRAINT "todos_props_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_todo_props_id_todos_props_id_fk" FOREIGN KEY ("todo_props_id") REFERENCES "public"."todos_props"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects_is_deleted_index" ON "projects" ("is_deleted");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects_is_archived_index" ON "projects" ("is_archived");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sub_todos_is_deleted_index" ON "sub_todos" ("is_deleted");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todos_props_is_deleted_index" ON "todos_props" ("is_deleted");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todos_is_deleted_index" ON "todos" ("is_deleted");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspaces_is_deleted_index" ON "workspaces" ("is_deleted");