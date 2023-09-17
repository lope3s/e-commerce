import config from "../../../knexfile"
import knex from "knex"
import CartService from "../../../src/services/CartService"

describe("Testing cart service", () => {
    const db = knex(config["test"])

    const cartService = new CartService()

    beforeAll(async() => {
        await db.migrate.latest()
    })

    afterEach(async () => {
        await db.delete().from("cart_items")
    })

    afterAll(async() => {
        await db.migrate.rollback(undefined, true)
        await db.destroy()
    })


    it("Should return all the cart items with the provided user_id", async () => {
        const payload = [{ product_id: 1, user_id: 1, product_amount: 1 }, { product_id: 1, user_id: 2, product_amount: 1 }]
        await db("cart_items").insert(payload)

        const userCartItems = await cartService.getUserItems(1)

        expect(userCartItems.length).toBe(1)
        expect(userCartItems[0]).toEqual({id: 1, ...payload[0]})
    })

    it("Should store the provided data if payload is ok", async () => {
        const payload = {
            product_id: 1,
            user_id: 1,
            product_amount: 2
        }

        const cartItem = await cartService.createItem(payload)

        const [cartItemFromDB] = await db.select().from("cart_items").where({ id: cartItem.id })

        expect(cartItem).toStrictEqual(cartItemFromDB)
    })

    it("Should delete the provided cart_id", async () => {
        const payload = { id: 1, product_id: 1, user_id: 1, product_amount: 1 }
        await db("cart_items").insert(payload)

        await cartService.dropItem(1)

        const cartItems = await db.select().from("cart_items")

        expect(cartItems).toStrictEqual([])
    })

    it("Should return the item with the provided id", async() => {
        const payload = { id: 1, product_id: 1, user_id: 1, product_amount: 1 }
        await db("cart_items").insert(payload)

        const item = await cartService.getItem(1)

        expect(item).toEqual(payload)
    })
})
