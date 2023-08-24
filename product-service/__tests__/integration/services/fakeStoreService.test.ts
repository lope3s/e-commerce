import getProducts from "../../../src/jobs/getProducts";

import knex from "knex";
import * as knexConfig from "../../../knexfile";

describe("Testing getProducts job", () => {
  const db = knex(knexConfig[process.env["NODE_ENV"] || "test"]);

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  it("Should fetch data from the Fake Store API and store it in our database", async () => {
    const registeredItems = await getProducts();

    const products = await db.select().from("products");

    expect(registeredItems).toStrictEqual(products);
  });
});
