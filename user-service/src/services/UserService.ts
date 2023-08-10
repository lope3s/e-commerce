import { Knex } from "knex";
import hashPassword from "../utils/hashPassword";

class UserService {
  db: Knex;

  constructor(databaseConnection: Knex) {
    this.db = databaseConnection;
  }

  async create(userObj: any) {
    if (!userObj.name) throw new Error("Missing name");

    if (!userObj.email) throw new Error("Missing email");

    if (!userObj.password) throw new Error("Missing password");

    const hashedPassword = hashPassword(userObj.password);

    await this.db("users").insert({ ...userObj, password: hashedPassword });
  }
}

export default UserService;
