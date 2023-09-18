import "dotenv/config"
import amqplib from "amqplib"

async function testQueue ()  {
    const queue = "task"

    const string = `amqp://${process.env["RBMQ_USER"]}:${process.env["RBMQ_PASSWORD"]}@127.0.0.1`

    const connection = await amqplib.connect(string)

    const ch = await connection.createChannel();

    await ch.assertQueue(queue)

    ch.consume(queue, (msg) => {
        if (msg !== null) {
            console.log("Recieved:", msg.content.toString())
            ch.ack(msg)
            return
        }

        console.log("Consumer cancelled by the server")
    })

    const ch2 = await connection.createChannel()

    setInterval(() => {
        ch2.sendToQueue(queue, Buffer.from("something to do"))
    }, 1000)
}

export default testQueue
