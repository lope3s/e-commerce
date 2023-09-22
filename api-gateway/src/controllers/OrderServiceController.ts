import axios from "axios";
import { Request, Response } from "express";

class OrderServiceController {
    async update(req: Request, res: Response) {
        try {
            const response = await axios.put(process.env["ORDER_SERVICE_URL"] + "/create-order" + `/${req.params.id}`|| "")
            return res.status(response.status).json(response.data)
        } catch (error: any) {
           return res.status(error.response.status).json(error.response.data) 
        }
    }
}

export default new OrderServiceController();
