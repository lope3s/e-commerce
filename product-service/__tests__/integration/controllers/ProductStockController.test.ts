import app from "../../../src/app"
import axios from "axios"
import {Server} from "node:http"
import knex from "knex"
import * as knexConfig from "../../../knexfile"

describe("Testing drop stock route", () => {
    const config = knexConfig as {[key: string]: any}
    const SERVER_PORT = 10003
    const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}/product-stock`
    const db = knex(config["test"])

    let server: Server;

    beforeAll(() => {
        server = app.listen(SERVER_PORT)
    })

    afterAll(() => {
        server.close()
    })

    it("Should return status 400 if the payload is not as expected", async() => {
        const payload = {mode: "test", quantity: 0}

        try {
           await axios.put(SERVER_URL + "/99", payload) 

           throw new Error()
        } catch (error: any) {
           expect(error.response.status).toBe(400)
           expect(error.config.headers["Content-Type"]).toStrictEqual("application/json")
           expect(error.response.data).toStrictEqual({error: "Payload is not right."})
        }
    })

    it("Should return status 404 if the informed product id doesn't exist in database", async() => {
        const payload = {mode: "drop", quantity: 99}

        try {
           await axios.put(SERVER_URL + '/99', payload)

           throw new Error()
        } catch (error: any) {
            expect(error.response.status).toEqual(404);
            expect(error.config.headers["Content-Type"]).toStrictEqual(
              "application/json"
            );
            expect(error.response.data).toStrictEqual({ error: "Product not found." });
        }
    })

    it("Should return status 400 if trying to reduce the stock quantity bellow 0", async() => {
        const payload = {mode: "drop", quantity: 99}

        try {
           await axios.put(SERVER_URL + "/1", payload) 

           throw new Error()
        } catch (error: any) {
           expect(error.response.status).toBe(400)
           expect(error.config.headers["Content-Type"]).toStrictEqual("application/json")
           expect(error.response.data).toStrictEqual({error: "Can't drop the stock below 0"})
        }
    })

    it("Should increase the stock quantity if everything is okay", async() => {
        const payload = {mode: "increment", quantity: 9}
        
        const data = await axios.put(SERVER_URL + "/1", payload) 
        
        expect(data.status).toBe(200)
        expect(data.headers["content-type"]).toStrictEqual("application/json")
           
        const [product1] = await db.select().from("products").where({id: 1})

        expect(product1.stock).toBe(10)
    })

    it("Should drop the stock quantity if everything is okay", async() => {
        const payload = {mode: "drop", quantity: 10}

        const data = await axios.put(SERVER_URL + "/1", payload)

        expect(data.status).toBe(200)
        expect(data.headers["content-type"]).toStrictEqual("application/json")

        const [product1] = await db.select().from("products").where({id: 1})

        expect(product1.stock).toBe(0)
    })
})
