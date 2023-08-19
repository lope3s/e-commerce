import { Request, Response } from "express";
import UserService from "../services/UserService";
import db from "../database/database";
import { UserServiceError } from "../types/errors/UserService";
import validateLogin from "../utils/validations/validateLogin";
import { LoginValidationError } from "../types/errors/ValidateLogin";

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

  async login(req: Request, res: Response) {
    try {
      validateLogin(req.body);

      const userService = new UserService(db);

      const token = await userService.login(req.body);

      return res.status(200).json(token);
    } catch (error: any) {
      if (
        error instanceof LoginValidationError ||
        error instanceof UserServiceError
      ) {
        return res.status(error.code).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
