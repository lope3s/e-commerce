import "dotenv/config";
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env["DATABASE_DB"],
      user: process.env["DATABASE_USER"],
      password: process.env["DATABASE_PASSWORD"],
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./test.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};

module.exports = config;
