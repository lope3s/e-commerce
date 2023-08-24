import "dotenv/config";
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5433,
      user: process.env["DB_USER"],
      database: process.env["DB_DATABASE"],
      password: process.env["DB_PASSWORD"],
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./tests_db.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};

module.exports = config;
