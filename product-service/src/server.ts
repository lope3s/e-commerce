import app from "./app";

const APP_PORT = process.env["APP_PORT"];

app.listen(APP_PORT, () =>
  console.log(`Product service is running on port ${APP_PORT}`)
);
