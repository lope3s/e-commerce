import app from "../../../src/app";
import { Server } from "node:http";
import knex from "knex";
import * as knexConfig from "../../../knexfile";
import axios from "axios";

describe("Testing ProductsController", () => {
  const config = knexConfig as { [key: string]: any };
  let server: Server;

  const db = knex(config["test"]);

  beforeAll(async () => {
      server = app.listen(10002);
  });

  afterAll(async () => {
    await db.destroy();
    if (server) server.close();
  });

  it("Should return a status 200 and the products from the database in the response body", async () => {
    try {
      const data = await axios.get("http://127.0.0.1:10002/products");

      const productsList = await db.select().from("products");

      expect(data.data).toEqual(productsList);
      expect(data.headers["content-type"]).toStrictEqual(
        "application/json; charset=utf-8"
      );
      expect(data.status).toEqual(200);
    } catch (error: any) {
      console.log(error);
      throw new Error(`Test failed with message: ${error.message}`);
    }
  });
});
