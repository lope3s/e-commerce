import { Router } from "express";
import UserController from "../controllers/UserController";

const loginRoute = Router();

loginRoute.post("/", UserController.login);

export default loginRoute;
