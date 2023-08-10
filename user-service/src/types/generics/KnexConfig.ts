import { Knex } from "knex";

export type KnexConfig = {
  [key: string]: Knex.Config;
};
