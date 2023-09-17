import {Router} from "express"
import ProductsStockController from "../controllers/ProductStockController"

const productsStockRoute = Router()

productsStockRoute.put("/:productID", ProductsStockController.update)

export default productsStockRoute
