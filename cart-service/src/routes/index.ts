import {Router} from "express"

import cartRoute from "./cartRoute";

const routes = Router()

routes.use("/cart-items", cartRoute)

export default routes;
