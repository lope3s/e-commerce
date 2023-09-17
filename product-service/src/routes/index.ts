import {Router} from "express"

import productsRoute from "./products"
import productsStockRoute from "./productsStock"

const routes = Router()

routes.use('/products', productsRoute)
routes.use("/product-stock", productsStockRoute)

export default routes
