import {createServer} from "node:http"
import CartService from "../../../src/services/CartService"

describe("Testing CartService", () => {
    const SERVER_PORT = 10000

    const server = createServer((_, res) => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
            user_id: 1,
            product_id: 1,
            product_amount: 1
        }))
    }) 

    const cartService = new CartService()

    beforeAll(() => {
        server.listen(SERVER_PORT)
    })

    afterAll(() => {
        server.close()
    })

    it("Should fetch the cart service to update the user cart", async() => {
        const response = await cartService.updateCart(1)

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toContain("application/json")
        expect(response.data).toEqual({
            user_id: 1,
            product_id: 1,
            product_amount: 1
        })
    })
})
