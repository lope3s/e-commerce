import app from "./app"

const APP_PORT = process.env["APP_PORT"]

app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`)
})
