import "dotenv/config";
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env["DATABASE_HOST"],
      port: process.env["DATABASE_PORT"]
        ? parseInt(process.env["DATABASE_PORT"])
        : 0,
      user: process.env["DATABASE_USER"],
      database: process.env["DATABASE_DB"],
      password: process.env["DATABASE_PASSWORD"],
      debug: true,
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
