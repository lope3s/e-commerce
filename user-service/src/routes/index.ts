import { Router } from "express";

import signupRoutes from "./signUp";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "success" });
});

routes.use("/signup", signupRoutes);

export default routes;
