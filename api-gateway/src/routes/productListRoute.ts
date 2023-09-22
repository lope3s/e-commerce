import {Router} from "express"
import ProductServiceController from "../controllers/ProductServiceController"
import authMiddleware from "../middleware/authMiddleware"

const productListRoute = Router()

productListRoute.use(authMiddleware)

productListRoute.get("/", ProductServiceController.index)

export default productListRoute
