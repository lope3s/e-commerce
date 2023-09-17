import {Router} from "express"
import CartController from "../controllers/CartController"

const cartRoute = Router()

cartRoute.post("/", CartController.store)
cartRoute.get("/", CartController.index)
cartRoute.put("/:id", CartController.buy)

export default cartRoute;
