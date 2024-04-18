alter table "public"."item_image" add constraint "item_image_item_id_display_order_key" unique ("item_id", "display_order");
