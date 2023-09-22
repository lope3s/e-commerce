import axios from "axios";
import { Request, Response } from "express";

interface Req extends Request {
    [key: string]: any
}

class CartServiceController {
    async create(req: Req, res: Response) {
        try {
            req.body.user_id = req.user.id
            const response = await axios.post(process.env["CART_SERVICE_URL"] + "/cart-items" || "", req.body)
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }

    async index(req: Req, res: Response) {
        try {
            req.query.user_id = req.user.id
            const response = await axios.get(process.env["CART_SERVICE_URL"] + "/cart-items" || "", {params: req.query})
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }
}

export default new CartServiceController();

