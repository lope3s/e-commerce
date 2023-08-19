import { Router } from "express";

import signupRoutes from "./signUp";
import loginRoute from "./login";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "success" });
});

routes.use("/signup", signupRoutes);
routes.use("/login", loginRoute);

export default routes;
