import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").notNullable();
    table.string("title").notNullable();
    table.double("price").notNullable();
    table.text("description").notNullable();
    table.string("category").notNullable();
    table.string("image").notNullable();
    table.integer("stock").notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
