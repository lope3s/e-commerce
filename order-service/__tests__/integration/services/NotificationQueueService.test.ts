import "dotenv/config"
import amqplib from "amqplib"
import NotificationQueueService from "../../../src/services/NotificationQueueService"

describe("Testing NotificationQueueService", () => {
    let channel: amqplib.Channel | undefined;
    let connection: amqplib.Connection | undefined;

    const QUEUE = process.env["QUEUE_NAME"] || ""

    beforeAll(async() => {
        connection = await amqplib.connect(process.env["RBMQ_CONNECTION_STRING"] || "")

        channel = await connection.createChannel()

        await channel.assertQueue(QUEUE)
    })

    it("Should place a notification on the queue", async() => {
        const notificationQueue = new NotificationQueueService()

        await notificationQueue.placeNotification()

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
