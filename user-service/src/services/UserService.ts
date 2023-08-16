import hashPassword from "../utils/hashPassword";

import { Knex } from "knex";
import { User } from "../types/entities/Users";
import {
  UserServiceError,
  UserServiceErrorCodes,
} from "../types/errors/UserService";

class UserService {
  db: Knex;

  constructor(databaseConnection: Knex) {
    this.db = databaseConnection;
  }

  async create(userObj: User) {
    if (!userObj.name)
      throw new UserServiceError(
        "Missing name",
        UserServiceErrorCodes.MISSING_FIELD
      );

    if (!userObj.email)
      throw new UserServiceError(
        "Missing email",
        UserServiceErrorCodes.MISSING_FIELD
      );

    if (!userObj.password)
      throw new UserServiceError(
        "Missing password",
        UserServiceErrorCodes.MISSING_FIELD
      );

    const hashedPassword = hashPassword(userObj.password);

    const usersWithProvidedEmail = await this.db
      .select()
      .from("users")
      .where({ email: userObj.email });

    if (usersWithProvidedEmail.length)
      throw new UserServiceError(
        "E-mail already registered",
        UserServiceErrorCodes.DUPLICATED_DATA
      );

    const [{ id }] = await this.db("users").insert(
      {
        ...userObj,
        password: hashedPassword,
      },
      ["id"]
    );

    return id;
  }
}

export default UserService;
