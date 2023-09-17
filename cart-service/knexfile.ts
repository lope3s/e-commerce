import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
      client: "pg",
      connection: {
          user: process.env["DB_USER"],
          database: process.env["DB_DATABASE"],
          password: process.env["DB_PASSWORD"],
          port: 5434,
          host: "127.0.0.1"
      },
      migrations: {
          directory: "./src/database/migrations"
      },
      useNullAsDefault: true
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./test.sqlite3"
    },
    migrations: {
        directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  }
};

export default config
