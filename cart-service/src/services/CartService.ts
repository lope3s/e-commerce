import knex from "knex";
import config from "../../knexfile";

class CartService {
    #TABLE_NAME = "cart_items"

    async getUserItems(user_id: number) {
        const db = knex(config[process.env["NODE_ENV"] || "development"])

        const userItems = await db.select().from(this.#TABLE_NAME).where({user_id})

        await db.destroy()

        return userItems
    }

    async createItem(payload: object) {
        const db = knex(config[process.env["NODE_ENV"] || "development"])

        const [item] = await db(this.#TABLE_NAME).insert(payload, ["id", "user_id", "product_id", "product_amount"])

        await db.destroy()

        return item
    }

    async dropItem(id: number) {
        const db = knex(config[process.env["NODE_ENV"] || "development"])

        await db.delete().from(this.#TABLE_NAME).where({id})

        await db.destroy()
    }

    async getItem(id: number) {
        const db = knex(config[process.env["NODE_ENV"] || "development"])

        const [item] = await db.select().from(this.#TABLE_NAME).where({id})

        await db.destroy()

        return item
    }
}

export default CartService;
