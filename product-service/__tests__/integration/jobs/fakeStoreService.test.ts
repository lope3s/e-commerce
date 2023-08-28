import getProducts from "../../../src/jobs/getProducts";

import knex from "knex";
import * as knexConfig from "../../../knexfile";

import { createServer } from "node:http";

describe("Testing getProducts job", () => {
  const db = knex(knexConfig[process.env["NODE_ENV"] || "test"]);
  const server = createServer((_, res) => {
    const resBody = [
      {
        id: 1,
        title: "test",
        price: 20.0,
        description: "test",
        category: "test",
        image: "test",
      },
    ];
    res.statusCode = 200;
    res.write(JSON.stringify(resBody));
    res.end();
  });

  beforeAll(async () => {
    await db.migrate.latest();
    server.listen(10001);
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
    server.close();
  });

  it("Should fetch data from the Fake Store API and store it in our database", async () => {
    const registeredItems = await getProducts("http://localhost:10001");

    const products = await db.select().from("products");

    expect(products).toEqual(registeredItems);
  });
});
