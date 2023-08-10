import hashPassword from "../utils/hashPassword";

import { Knex } from "knex";
import { User } from "../types/entities/Users";

class UserService {
  db: Knex;

  constructor(databaseConnection: Knex) {
    this.db = databaseConnection;
  }

  async create(userObj: User) {
    if (!userObj.name) throw new Error("Missing name");

    if (!userObj.email) throw new Error("Missing email");

    if (!userObj.password) throw new Error("Missing password");

    const hashedPassword = hashPassword(userObj.password);

    await this.db("users").insert({ ...userObj, password: hashedPassword });
  }
}

export default UserService;
