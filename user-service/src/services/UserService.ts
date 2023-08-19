import hashPassword from "../utils/hashPassword";

import { Knex } from "knex";
import { User } from "../types/entities/Users";
import {
  UserServiceError,
  UserServiceErrorCodes,
} from "../types/errors/UserService";
import { Login } from "../types/generics/Login";
import signJWT from "../utils/signJWT";

class UserService {
  db: Knex;

  constructor(databaseConnection: Knex) {
    this.db = databaseConnection;
  }

  async create(userObj: User) {
    if (!userObj.name)
      throw new UserServiceError(
        "Missing name",
        UserServiceErrorCodes.BAD_REQUEST
      );

    if (!userObj.email)
      throw new UserServiceError(
        "Missing email",
        UserServiceErrorCodes.BAD_REQUEST
      );

    if (!userObj.password)
      throw new UserServiceError(
        "Missing password",
        UserServiceErrorCodes.BAD_REQUEST
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

  async login(loginObj: Login): Promise<{ token: string }> {
    const hashedPassword = hashPassword(loginObj.password);

    const user = await this.db
      .select("id", "name", "email")
      .from("users")
      .where({ email: loginObj.email, password: hashedPassword });

    if (!user.length)
      throw new UserServiceError(
        "Invalid credentials",
        UserServiceErrorCodes.BAD_REQUEST
      );

    const token = signJWT(user[0]);

    return { token };
  }
}

export default UserService;
