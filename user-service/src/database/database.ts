import knex from "knex";

const env = process.env;

if (!env["DATABASE_PORT"]) {
  console.log("Missing database port, check configurations");
  process.exit(1);
}

const db = knex({
  client: "pg",
  connection: {
    host: env["DATABASE_HOST"],
    port: parseInt(env["DATABASE_PORT"]),
    user: env["DATABASE_USER"],
    database: env["DATABASE_DB"],
    password: env["DATABASE_PASSWORD"],
    debug: true,
  },
});

export default db;
