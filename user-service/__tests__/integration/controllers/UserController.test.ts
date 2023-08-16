import server from "../../../src/server.ts";
import axios from "axios";
import { Server } from "node:http";
import * as knexConfig from "../../../knexfile";
import knex from "knex";
import { KnexConfig } from "../../../src/types/generics/KnexConfig";

describe("Testing UserController", () => {
  const appURI = `http://localhost:${process.env["APP_PORT"]}`;
  let serverInstance: Server | undefined;
  const dbConfig = knexConfig as KnexConfig;
  const db = knex(dbConfig.test);

  beforeAll(async () => {
    await db.migrate.latest();
    serverInstance = server.listen(process.env["APP_PORT"]);
  });

  afterAll(async () => {
    if (serverInstance) {
      try {
        await db.migrate.rollback();
        await db.destroy();
        serverInstance.close();
      } catch (error) {
        console.log(error);
      }
    }
  });

  describe("Creating user route", () => {
    it("Should return a status 400 and a error message if no name is provided", async () => {
      const userObj = {
        email: "test@mail.com",
        password: "test1234",
      };

      try {
        await axios.post(`${appURI}/signup`, userObj);

        throw new Error("Should have failed with status 400 and a massage");
      } catch (error: any) {
        expect(error.response.data).toStrictEqual({ error: "Missing name" });
        expect(error.config.headers["Content-Type"]).toStrictEqual(
          "application/json"
        );
        expect(error.response.status).toEqual(400);
      }
    });

    it("Should return a status 400 and a error message if no email is provided", async () => {
      const userObj = {
        name: "test",
        password: "test1234",
      };

      try {
        await axios.post(`${appURI}/signup`, userObj);

        throw new Error("Should have failed with status 400 and a massage");
      } catch (error: any) {
        expect(error.response.data).toStrictEqual({ error: "Missing email" });
        expect(error.config.headers["Content-Type"]).toStrictEqual(
          "application/json"
        );
        expect(error.response.status).toEqual(400);
      }
    });

    it("Should return a status 400 and a error message if no password is provided", async () => {
      const userObj = {
        name: "test",
        email: "test@mail.com",
      };

      try {
        await axios.post(`${appURI}/signup`, userObj);

        throw new Error("Should have failed with status 400 and a massage");
      } catch (error: any) {
        expect(error.response.data).toStrictEqual({
          error: "Missing password",
        });
        expect(error.config.headers["Content-Type"]).toStrictEqual(
          "application/json"
        );
        expect(error.response.status).toEqual(400);
      }
    });

    it("Should create an user right if all the data is provided correclty", async () => {
      const userObj = {
        name: "test",
        email: "test@mail.com",
        password: "test1234",
      };

      const response = await axios.post(`${appURI}/signup`, userObj);

      expect(response.data).toStrictEqual({
        success: "User created successfuly",
      });
      expect(response.headers["content-type"]).toContain("application/json");
      expect(response.status).toEqual(201);
    });

    it("Shouldn't create an user if email is already registered", async () => {
      const userObj = {
        name: "test1",
        email: "test@mail.com",
        password: "test1234",
      };

      try {
        await axios.post(`${appURI}/signup`, userObj);

        throw new Error(
          "Should have failed with status 409 and a massage of duplicated e-mail"
        );
      } catch (error: any) {
        expect(error.response.data).toStrictEqual({
          error: "E-mail already registered",
        });
        expect(error.config.headers["Content-Type"]).toContain(
          "application/json"
        );
        expect(error.response.status).toEqual(409);
      }
    });
  });
});
