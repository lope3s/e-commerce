import "dotenv/config";
import express from "express";
import routes from "./routes";

const app = express();

app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log("Server listening on port:", process.env.APP_PORT);
});
