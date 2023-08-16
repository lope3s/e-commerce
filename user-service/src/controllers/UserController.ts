import { Request, Response } from "express";
import UserService from "../services/UserService";
import db from "../database/database";
import { UserServiceError } from "../types/errors/UserService";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const userService = new UserService(db);

      await userService.create(req.body);

      return res.status(201).json({ success: "User created successfuly" });
    } catch (error: any) {
      if (error instanceof UserServiceError) {
        return res.status(error.code).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
