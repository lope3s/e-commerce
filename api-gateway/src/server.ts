import app from "./app"

const SERVER_PORT = process.env["APP_PORT"]

app.listen(SERVER_PORT, () => console.log('Server is running on port:', SERVER_PORT))
