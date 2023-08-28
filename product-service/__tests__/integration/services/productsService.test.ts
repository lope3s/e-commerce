import knex from "knex";
import * as knexConfig from "../../../knexfile";
import ProductService from "../../../src/services/Products";
import { Product } from "../../../src/types/entities/Product";

describe("Testing Product Service", () => {
  const db = knex(knexConfig[process.env["NODE_ENV"] || "test"]);

  const pService = new ProductService();

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  describe("Testing bulk insert method", () => {
    //it("Should not insert the payload if missing data", async () => {
    //  const missingDataPyld: any[] = [
    //    {
    //      id: 1,
    //      title: "test",
    //    },
    //  ];

    //  const creatingPromise = pService.bulkCreate(missingDataPyld);

    //  expect(creatingPromise).rejects.toThrow();
    //});

    it("Should create the register properly if payload is ok", async () => {
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

      const insertedCount = await pService.bulkCreate(payload);

      expect(insertedCount).toStrictEqual([2]);

      const productsTable = await db.select().from<Product>("products");

      expect(productsTable).toEqual(payload);
    });
  });
});
