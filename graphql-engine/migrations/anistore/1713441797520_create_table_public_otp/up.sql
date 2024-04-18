CREATE TABLE "public"."otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" varchar NOT NULL, "code" varchar NOT NULL, "type" varchar NOT NULL, "expired_time" timestamp with time zone, "created_at" timestamp with time zone DEFAULT now(), "updated_at" timestamp with time zone DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
