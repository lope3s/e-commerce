import {Router} from "express"

import productsRoute from "./products"

const routes = Router()

routes.use('/products', productsRoute)

export default routes
