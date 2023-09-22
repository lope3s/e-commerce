import "dotenv/config"
import amqplib from "amqplib"

async function logging() {
    const QUEUE = process.env["QUEUE_NAME"] || ""

    const connection = await amqplib.connect(process.env["RBMQ_CONNECTION_STRING"] || "")
    const channel = await connection.createChannel()
    await channel.assertQueue(QUEUE)

    channel.consume(QUEUE, (msg) => {
        if (msg) {
            console.log(msg.content.toString())
        }
    }, {noAck: true})

    return {chan: channel, con: connection}
}

export default logging
