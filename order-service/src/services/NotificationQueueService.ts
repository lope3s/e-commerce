import amqplib from "amqplib"

class NotificationQueueService {
    #QUEUE_NAME = process.env["QUEUE_NAME"] || ""
    async placeNotification() {
        const connection = await amqplib.connect(process.env["RBMQ_CONNECTION_STRING"] || "")

        const channel = await connection.createChannel()

        await channel.assertQueue(this.#QUEUE_NAME)

        const message = {
            message: "Notify",
            status: "ok"
        }

        channel.sendToQueue(this.#QUEUE_NAME, Buffer.from(JSON.stringify(message)))

        await channel.close()
        await connection.close()
    }
}

export default NotificationQueueService;
