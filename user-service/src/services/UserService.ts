import hashPassword from "../utils/hashPassword";

import { Knex } from "knex";
import { User } from "../types/entities/Users";
import UserServiceError from "../types/errors/UserService";

class UserService {
  db: Knex;

  constructor(databaseConnection: Knex) {
    this.db = databaseConnection;
  }

  async create(userObj: User) {
    if (!userObj.name) throw new UserServiceError("Missing name");

    if (!userObj.email) throw new UserServiceError("Missing email");

    if (!userObj.password) throw new UserServiceError("Missing password");

    const hashedPassword = hashPassword(userObj.password);

    await this.db("users").insert({ ...userObj, password: hashedPassword });
  }
}

export default UserService;
