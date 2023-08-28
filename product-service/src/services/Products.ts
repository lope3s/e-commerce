import knex from "knex";
import * as knexConfig from "../../knexfile";

import { Product } from "../types/entities/Product";

class ProductsService {
  async bulkCreate(payload: Product[]): Promise<number[]> {
    const connection = knex(
      knexConfig[process.env["NODE_ENV"] || "development"]
    );

    const insertedCount = await connection("products").insert(payload);

    await connection.destroy();

    return insertedCount;
  }
}

export default ProductsService;
