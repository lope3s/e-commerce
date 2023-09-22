import {Router} from "express"
import UserServiceController from "../controllers/UserServiceController"

const loginRoute = Router()

loginRoute.post("/", UserServiceController.login)

export default loginRoute
