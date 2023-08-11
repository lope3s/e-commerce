import UserService from "../../../src/services/UserService";
import * as knexConfig from "../../../knexfile";
import knex from "knex";
import hashPassword from "../../../src/utils/hashPassword";
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

      await service.create(userObj);

      const user = await db.select().from("users").where({ id: 1 });

      const expectedPassword = hashPassword(userObj.password);

      expect(user.length).toEqual(1);
      expect(user[0].name).toStrictEqual("lopes");
      expect(user[0].email).toStrictEqual("test@mail.com");
      expect(user[0].password).toStrictEqual(expectedPassword);
    });
  });
});
