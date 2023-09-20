import {Router} from "express"

import orderRoute from "./order"

const routes = Router()

routes.use("/create-order", orderRoute)

export default routes;
