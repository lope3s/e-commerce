import getProducts from "../../../src/jobs/getProducts";

import knex from "knex";
import * as knexConfig from "../../../knexfile";

import { createServer } from "node:http";

describe("Testing getProducts job", () => {
  const config = knexConfig as { [key: string]: any };
  const db = knex(config[process.env["NODE_ENV"] || "test"]);
  const server = createServer((_, res) => {
    const resBody = [
      {
        id: 1,
        title: "test",
        price: 20.0,
        description: "test",
        category: "test",
        image: "test",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
    ];
    res.statusCode = 200;
    res.write(JSON.stringify(resBody));
    res.end();
  });

  beforeAll(async () => {
    server.listen(10001);
  });

  afterEach(async () => {
    await db.delete().from("products");
  });

  afterAll(async () => {
    await db.delete().from("products");
    await db.destroy();
    server.close();
  });

  const defaultData = [
    {
      id: 1,
      title: "test",
      price: 20.0,
      description: "test",
      category: "test",
      image: "test",
    },
  ];

  it("Should remove the ratingsField from the input array before inserting", async () => {
    const registeredItems = await getProducts("http://localhost:10001");
    expect(registeredItems).toEqual(defaultData);
  });

  it("Should fetch data from the Fake Store API and store it in our database", async () => {
    const registeredItems = await getProducts("http://localhost:10001");

    const products = await db.select().from("products");

    expect(products).toEqual(registeredItems);
  });

  it("Should not insert data on the database if database already has some products", async () => {
    await db("products").insert(defaultData);
    const registeredItems = await getProducts("http://localhost:10001");

    expect(registeredItems).toStrictEqual([]);

    const products = await db.select().from("products");

    expect(defaultData).toEqual(products);
  });
});
