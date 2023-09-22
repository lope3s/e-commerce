import axios from "axios";
import { Request, Response } from "express";

class UserServiceController {
    async signup(req: Request, res: Response) {
        try {
            const response = await axios.post(process.env["USER_SERVICE_URL"] + "/signup" || "", req.body)
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }

    async login(req: Request, res: Response) {
        try {
            const response = await axios.post(process.env["USER_SERVICE_URL"] + "/login" || "", req.body)
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }
}

export default new UserServiceController();
