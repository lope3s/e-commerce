import axios from "axios"
import app from "../../../src/app"
import {Server, createServer} from "node:http"
import amqplib from "amqplib"

describe("Testing OrderController", () => {
    let server: Server | undefined;
    let channel: amqplib.Channel | undefined;
    let connection: amqplib.Connection | undefined;

    const QUEUE = process.env["QUEUE_NAME"] || ""

    const cartMock = jest.fn((_, res) => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
            user_id: 1,
            product_id: 1,
            product_amount: 1
        }))
    })

    const productMock = jest.fn((_, res) => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({
           success: "Product updated successfully"
        }))
    })

    const cartServer = createServer((req, res) => {
        cartMock(req, res)
    })

    const productServer = createServer((req, res) => {
        productMock(req, res)
    })

    beforeAll(async() => {
        cartServer.listen(10000)
        productServer.listen(10001)
        server = app.listen(10002)

        connection = await amqplib.connect(process.env["RBMQ_CONNECTION_STRING"] || "")

        channel = await connection.createChannel()

        await channel.assertQueue(QUEUE)
    })

    afterAll(() => {
        if (server) {
            server.close()
        }

        productServer.close()
        cartServer.close()
    })

    it("Should return status 200 and a message telling if the order was created", async() => {
        const response = await axios.put("http://localhost:10002/create-order/1")

        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toContain("application/json")
        expect(response.data).toEqual({ok: "Order created."})
        expect(cartMock.mock.calls).toHaveLength(1)
        expect(productMock.mock.calls).toHaveLength(1)

        channel?.consume(QUEUE, async (message) => {
            if (message) {
                const messageDecoded = JSON.parse(message.content.toString())

                expect(messageDecoded).toEqual({
                    message: "Notify",
                    status: "ok"
                })

                if (channel && connection) {
                    await channel.close()
                    await connection.close()
                }

                return
            }

            throw new Error("message was null")
        })
    })
})
