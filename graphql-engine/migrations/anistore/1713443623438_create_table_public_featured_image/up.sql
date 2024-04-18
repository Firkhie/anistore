CREATE TABLE "public"."featured_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" varchar NOT NULL, "display_order" integer NOT NULL, "type" varchar NOT NULL, "created_at" timestamp with time zone DEFAULT now(), "updated_at" timestamp with time zone DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("display_order", "type"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
