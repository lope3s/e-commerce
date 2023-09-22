import {Router} from "express"
import CartServiceController from "../controllers/CartServiceController"
import authMiddleware from "../middleware/authMiddleware"

const cartRoutes = Router()

cartRoutes.use(authMiddleware)

cartRoutes.get("/", CartServiceController.index)
cartRoutes.post("/", CartServiceController.create)

export default cartRoutes
