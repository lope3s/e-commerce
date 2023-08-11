import server from "../../../src/server.ts";
import axios from "axios";
import { Server } from "node:http";

describe("Testing UserController", () => {
  const appURI = `http://localhost:${process.env["APP_PORT"]}`;
  let serverInstance: Server | undefined;

  beforeAll(() => {
    serverInstance = server.listen();
  });

  afterAll(() => {
    if (serverInstance) {
      serverInstance.close();
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
  });
});
