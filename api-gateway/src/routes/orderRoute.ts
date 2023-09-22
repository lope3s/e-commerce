import {Router} from "express"
import OrderServiceController from "../controllers/OrderServiceController"
import authMiddleware from "../middleware/authMiddleware"

const orderRoute = Router()

orderRoute.use(authMiddleware)

orderRoute.put("/:id", OrderServiceController.update)

export default orderRoute
