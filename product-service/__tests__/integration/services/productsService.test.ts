import knex from "knex";
import * as knexConfig from "../../../knexfile";
import ProductService from "../../../src/services/Products";
import { Product } from "../../../src/types/entities/Product";

describe("Testing Product Service", () => {
  const config = knexConfig as { [key: string]: any };
  const db = knex(config[process.env["NODE_ENV"] || "test"]);

  const pService = new ProductService();

  afterEach(async () => {
    await db.delete().from("products");
  });

  afterAll(async () => {
    await db.delete().from("products");
    await db.destroy();
  });

  const payload = [
    {
      id: 1,
      title: "test",
      price: 20.0,
      description: "test",
      category: "test",
      image: "test",
    },
    {
      id: 2,
      title: "test",
      price: 20.0,
      description: "test",
      category: "test",
      image: "test",
    },
  ];

  describe("Testing bulk insert method", () => {
    it("Should not insert the payload if missing data", async () => {
      const missingDataPyld: any[] = [
        {
          id: 1,
          title: "test",
        },
      ];

      const creatingPromise = pService.bulkCreate(missingDataPyld);

      expect(creatingPromise).rejects.toThrow();
    });

    it("Should create the register properly if payload is ok", async () => {
      const insertedCount = await pService.bulkCreate(payload);

      expect(insertedCount).toStrictEqual([2]);

      const productsTable = await db.select().from<Product>("products");

      expect(productsTable).toEqual(payload);
    });
  });

  describe("Testing listProducts method", () => {
    it("Should return all the registered products", async () => {
      await db("products").insert(payload);

      const productsList = await pService.listProducts();

      expect(payload).toEqual(productsList);
    });

    it("Should return an empty array if no product is found", async () => {
      const productsList = await pService.listProducts();

      expect([]).toEqual(productsList);
    });
  });
});
