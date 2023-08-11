import { Router } from "express";
import UserController from "../controllers/UserController";

const signupRoutes = Router();

signupRoutes.post("/", UserController.create);

export default signupRoutes;
