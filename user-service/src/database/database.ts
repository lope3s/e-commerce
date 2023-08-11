import knex from "knex";
import * as knexConfig from "../../knexfile.ts";

const env = process.env;

if (!env["DATABASE_PORT"]) {
  console.log("Missing database port, check configurations");
  process.exit(1);
}

const nodeEnv = env["NODE_ENV"];

const config = nodeEnv ? nodeEnv : "development";

const db = knex((knexConfig as any)[config]);

export default db;
