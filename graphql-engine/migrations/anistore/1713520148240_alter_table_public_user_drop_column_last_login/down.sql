alter table "public"."user" alter column "last_login" drop not null;
alter table "public"."user" add column "last_login" varchar;
