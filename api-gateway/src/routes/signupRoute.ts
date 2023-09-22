import {Router} from "express"
import UserServiceController from "../controllers/UserServiceController"

const signupRoute = Router()

signupRoute.post("/", UserServiceController.signup)

export default signupRoute
