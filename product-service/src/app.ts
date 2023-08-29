import "dotenv/config";
import express from "express";

import getProducts from "./jobs/getProducts";

const app = express();

app.use(express.json());

getProducts(process.env["FAKE_STORE_API"] || "");

export default app;
