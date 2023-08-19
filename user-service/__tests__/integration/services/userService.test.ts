import UserService from "../../../src/services/UserService";
import * as knexConfig from "../../../knexfile";
import knex from "knex";
import hashPassword from "../../../src/utils/hashPassword";
import verifyJWT from "../../../src/utils/verifyJWT";
import { KnexConfig } from "../../../src/types/generics/KnexConfig";

describe("Testing UserService", () => {
  const dbConfig = knexConfig as KnexConfig;
  const db = knex(dbConfig.test);

  const service = new UserService(db);

  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    try {
      await db.migrate.rollback();
      await db.destroy();
    } catch (error) {
      console.log(error);
    }
  });

  describe("Testing create method", () => {
    it("Should return an error is no name is provided", () => {
      const userObj: any = {
        email: "test@mail.com",
        password: "test1234",
      };

      const promise = service.create(userObj);

      expect(promise).rejects.toThrow();
    });

    it("Should return an error is no email is provided", async () => {
      const userObj: any = {
        name: "lopes",
        password: "test1234",
      };

      const promise = service.create(userObj);

      expect(promise).rejects.toThrow();
    });

    it("Should return an error is no password is provided", async () => {
      const userObj: any = {
        name: "lopes",
        email: "test@mail.com",
      };

      const promise = service.create(userObj);

      expect(promise).rejects.toThrow();
    });

    it("Should create a user correctly if all the needed data is received", async () => {
      const userObj = {
        name: "lopes",
        email: "test@mail.com",
        password: "test1234",
      };

      const id = await service.create(userObj);

      const user = await db.select().from("users").where({ id });

      const expectedPassword = hashPassword(userObj.password);

      expect(user.length).toEqual(1);
      expect(user[0].name).toStrictEqual("lopes");
      expect(user[0].email).toStrictEqual("test@mail.com");
      expect(user[0].password).toStrictEqual(expectedPassword);
    });

    it("Should throw an error if email already exists in the database", async () => {
      const userObj = {
        name: "lopes2",
        email: "test@mail.com",
        password: "test1234",
      };

      const promise = service.create(userObj);

      expect(promise).rejects.toThrow();
    });
  });

  describe("Testing login method", () => {
    it("Should throw a invalid credential error if email doesn't exists in the database", async () => {
      const loginObj = {
        email: "doesntexist@mail.com",
        password: "test1234",
      };

      const promise = service.login(loginObj);

      expect(promise).rejects.toThrow();
    });

    it("Should throw a invalid credential error if password doens't match", async () => {
      const loginObj = {
        email: "test@mail.com",
        password: "wrongPassword",
      };

      const promise = service.login(loginObj);

      expect(promise).rejects.toThrow();
    });

    it("Should return a token if the email and password are right", async () => {
      const loginObj = {
        email: "test@mail.com",
        password: "test1234",
      };

      const token = await service.login(loginObj);

      const isTokenValid = verifyJWT(token.token);

      const expectedTokenUserPayload = {
        id: 1,
        name: "lopes",
        email: "test@mail.com",
      };

      expect(token).toHaveProperty("token");
      expect(isTokenValid).toMatchObject(expectedTokenUserPayload);
    });
  });
});
