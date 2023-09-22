import axios from "axios";
import { Request, Response } from "express";

class ProductServiceController {
    async index(req: Request, res: Response) {
        try {
            const response = await axios.get(process.env["PRODUCT_SERVICE_URL"] + "/products" || "", req.query)
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }
}

export default new ProductServiceController();
