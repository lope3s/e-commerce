import knex from "knex";
import * as knexConfig from "../../../knexfile";
import ProductService from "../../../src/services/Products";

describe("Testing Product Service", () => {
  const config = knexConfig as { [key: string]: any };
  const db = knex(config[process.env["NODE_ENV"] || "test"]);

  const pService = new ProductService();

  afterAll(async () => {
    await db.destroy();
  });

  describe("Testing listProducts method", () => {
    it("Should return all the registered products", async () => {
      const productsList = await pService.listProducts();

      // number of pre-registered itens in migration
      expect(productsList.length).toBe(20)
    });
  });
});
