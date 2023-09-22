import {Router} from "express"

import signupRoute from "./signupRoute"
import loginRoute from "./loginRoute"
import productListRoute from "./productListRoute"
import cartRoutes from "./cartRoutes"
import orderRoute from "./orderRoute"

const routes = Router()

routes.use("/signup", signupRoute)
routes.use("/login", loginRoute)
routes.use("/products", productListRoute)
routes.use("/cart", cartRoutes)
routes.use("/order", orderRoute)

export default routes;
