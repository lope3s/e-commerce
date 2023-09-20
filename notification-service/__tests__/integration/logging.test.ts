import "dotenv/config"
import amqplib from "amqplib"
import logging from "../../src/logging"

type BindedOriginalStdoutWrite = {
    (buffer: string | Uint8Array, cb?: ((err?: Error | undefined) => void) | undefined): boolean;
    (str: string | Uint8Array, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | undefined) => void) | undefined): boolean;
}


describe("Testing logging function", () => {
    let connection: amqplib.Connection | undefined;
    let channel: amqplib.Channel | undefined;

    let stdoutOutput = ""

    const QUEUE = process.env["QUEUE_NAME"] || ""

    beforeAll(async() => {
        connection = await amqplib.connect(process.env["RBMQ_CONNECTION_STRING"] || "")
        channel = await connection.createChannel()
        await channel.assertQueue(QUEUE)

        const originalProcessStdout = process.stdout.write.bind(process.stdout)

        process.stdout.write = ((chunk, enc, cb) => {
            if (typeof chunk === "string") {
                stdoutOutput += chunk
            }

            return originalProcessStdout(chunk, enc, cb) 
        }) as BindedOriginalStdoutWrite
    })

    it("Should consume data from the queue and log it to the sistem stdout", async() => {
        if (channel) {

            const payload = {
                        message: "Notify",
                        status: "ok"
            }

            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)))
            await logging()

            expect(stdoutOutput).toStrictEqual('"{"message":"Notiy","status":"ok"}"')
            return
        }

       throw new Error("Channel wasn't defined") 

    })
})
