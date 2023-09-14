import knex from "knex";
import * as knexConfig from "../../knexfile";

import { Product } from "../types/entities/Product";

class ProductsService {
  async listProducts(): Promise<Product[]> {
    const config = knexConfig as { [key: string]: any };
    const connection = knex(config[process.env["NODE_ENV"] || "development"]);

    const productList = await connection.select().from<Product>("products");

    await connection.destroy();

    return productList;
  }
}

export default ProductsService;
