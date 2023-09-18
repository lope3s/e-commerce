import {createServer} from "node:http"
import ProductService from "../../../src/services/ProductService"
import { UpdateProdutStockPayload } from "../../../src/types/UpdateProductStock"

describe("Testing ProductService", () => {
    const SERVER_PORT = 10001

    const server = createServer((_, res) => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
           success: "Product updated successfully"
        }))
    }) 

    const productService = new ProductService()

    beforeAll(() => {
        server.listen(SERVER_PORT)
    })

    afterAll(() => {
        server.close()
    })

    it("Should drop the product stock", async() => {
        const payload: UpdateProdutStockPayload = {
            mode: "drop",
            quantity: 1
        } 

        const response = await productService.updateProductStock(1, payload)

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toContain("application/json")
        expect(response.data).toEqual({
           success: "Product updated successfully"
        })
    })
})
