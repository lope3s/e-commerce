import {Router} from "express"
import ProductsController from "../controllers/ProductsController"

const productsRoutes = Router()

productsRoutes.get("/", ProductsController.index)

export default productsRoutes
