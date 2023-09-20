import {Router} from "express"
import OrderController from "../controllers/OrderController"

const orderRoute = Router()

orderRoute.put("/:id", OrderController.update)

export default orderRoute
