import app from "../../../src/app";
import { Server } from "node:http";
import knex from "knex";
import * as knexConfig from "../../../knexfile";
import axios from "axios";
import { Product } from "../../../src/types/entities/Product";

describe("Testing ProductsController", () => {
  const config = knexConfig as { [key: string]: any };
  let server: Server;

  const SERVER_PORT = 10002

  const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}/products`

  const db = knex(config["test"]);

  beforeAll(async () => {
      server = app.listen(SERVER_PORT);
  });

  afterAll(async () => {
    await db.destroy();
    if (server) server.close();
  });

  it("Should not return an item if its stock value is 0", async() => {
      await db("products").update({stock: 0}).where({id: 1})
      const data = await axios.get(SERVER_URL);
      
      expect(data.headers["content-type"]).toStrictEqual(
        "application/json; charset=utf-8"
      );
      expect(data.status).toEqual(200);

      const productWithoutStock = data.data.find((product: Product) => product.id == 1)

      expect(productWithoutStock).toBe(undefined)

      await db("products").update({stock: 1}).where({id: 1})
  })

  it("Should return a status 200 and the products from the database in the response body", async () => {
    try {
      const data = await axios.get(SERVER_URL);

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
