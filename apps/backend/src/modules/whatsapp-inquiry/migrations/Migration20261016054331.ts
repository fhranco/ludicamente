import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261016054331 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "whatsapp_inquiry" drop constraint if exists "whatsapp_inquiry_idempotency_key_unique";`);
    this.addSql(`alter table if exists "whatsapp_inquiry" drop constraint if exists "whatsapp_inquiry_reference_code_unique";`);
    this.addSql(`create table if not exists "whatsapp_inquiry" ("id" text not null, "reference_code" text not null, "status" text check ("status" in ('creada', 'contacto_iniciado', 'en_revision', 'mix_confirmado', 'cerrada', 'cancelada')) not null default 'creada', "customer_name" text not null, "customer_phone" text null, "delivery_preference" text not null default 'despacho_por_coordinar', "customer_notes" text null, "initial_items_snapshot" jsonb not null, "initial_total_clp" integer not null, "confirmed_items_snapshot" jsonb null, "confirmed_total_clp" integer null, "whatsapp_opened_at" timestamptz null, "internal_notes" text null, "idempotency_key" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "whatsapp_inquiry_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_whatsapp_inquiry_reference_code_unique" ON "whatsapp_inquiry" ("reference_code") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_whatsapp_inquiry_idempotency_key_unique" ON "whatsapp_inquiry" ("idempotency_key") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_whatsapp_inquiry_deleted_at" ON "whatsapp_inquiry" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "whatsapp_inquiry" cascade;`);
  }

}
