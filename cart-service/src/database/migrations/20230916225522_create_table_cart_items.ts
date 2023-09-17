import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cart_items", (table) => {
        table.increments("id")
        table.integer("product_id").notNullable()
        table.integer("user_id").notNullable()
        table.integer("product_amount").notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cart_items")
}

