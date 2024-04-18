CREATE TABLE "public"."item_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item_id" uuid NOT NULL, "image_url" varchar NOT NULL, "display_order" integer NOT NULL, "created_at" timestamp with time zone DEFAULT now(), "updated_at" timestamp with time zone DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
