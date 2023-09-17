import knex from "knex"
import config from "../../../knexfile"
import {Server} from "node:http"
import app from "../../../src/app"
import axios from "axios"

describe("Testing CartController", () => {
    const URL = "http://127.0.0.1:10000/cart-items"
    const db = knex(config["test"])

    let server: Server | undefined;

    beforeAll(async() => {
        await db.migrate.latest()

        server = app.listen(10000)
    })

    afterEach(async () => {
        await db.delete().from("cart_items")
    })

    afterAll(async() => {
        await db.migrate.rollback(undefined, true)
        await db.destroy()

        if (server) server.close()
    })

    describe("Testing create route", () => {
        it("Should return a error 400 if provided payload is not as expected", async() => {
            const payload = {
                user_id: 1,
                product_id: 1
            }

            try {
               const promise = axios.post(URL, payload)
               await expect(promise).rejects.toThrow()
            } catch (error: any) {
               expect(error.response.status).toBe(400)
               expect(error.config.headers["Content-Type"]).toStrictEqual("application/json")
               expect(error.response.data).toStrictEqual({error: "Payload is not right."})
            }
        })

        it("Should register the payload if everything is ok", async() => {
            const payload = {
                user_id: 1,
                product_id: 1,
                product_amount: 1,
            }

            const response = await axios.post(URL, payload)

            expect(response.headers["content-type"]).toContain("application/json")
            expect(response.status).toBe(201)
            expect(response.data).toEqual({id: 1, ...payload})
        })
    })

    describe("Testing retrieve user cart", () => {
        it("Should return an error 400 if no user_id is provided in the query string", async() => {
            try {
               const promise = axios.get(URL)
               await expect(promise).rejects.toThrow()
            } catch (error: any) {
               expect(error.response.status).toBe(400)
               expect(error.config.headers["Content-Type"]).toStrictEqual("application/json")
               expect(error.response.data).toStrictEqual({error: "No user_id provided."})
            }
        })

        it("Should only list items which the user_id is the same as the provided via query string", async() => {
            const baseData = [
                {
                    user_id: 1, 
                    product_id: 1,
                    product_amount: 1,
                },
                {
                    user_id: 2,
                    product_id: 1,
                    product_amount: 1,
                },
            ]

            await db("cart_items").insert(baseData)

            const response = await axios.get(URL + "?user_id=1")

            expect(response.status).toBe(200)
            expect(response.headers["content-type"]).toContain("application/json")
            expect(response.data.length).toBe(1)
            expect(response.data).toEqual([{id: 2, ...baseData[0]}])
        })
    })

    describe("Testing buy cart item", () => {
        it("Should return error 404 if item id doesn't exist", async() => {
            try {
               const promise = axios.put(URL + "/99")
               await expect(promise).rejects.toThrow()
            } catch (error: any) {
               expect(error.response.status).toBe(404)
               expect(error.config.headers["Content-Type"]).toStrictEqual("application/json")
               expect(error.response.data).toStrictEqual({error: "Item not found."})
            }
        })

        it("Should remove the item from the database and return it the user", async() => {
            const payload = {
                product_id: 1,
                user_id: 1,
                product_amount: 1,
            }

            await db("cart_items").insert(payload)

            const response = await axios.put(URL + "/4")

            expect(response.status).toBe(200)
            expect(response.headers["content-type"]).toContain("application/json")
            expect(response.data).toEqual({id: 4, ...payload})

            const dbQuery = await db.select().from("cart_items").where({id: 4})

            expect(dbQuery.length).toBe(0)
        })
    })
})
