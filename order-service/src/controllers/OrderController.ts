import { Request, Response } from "express";
import CartService from "../services/CartService";
import ProducService from "../services/ProductService";
import NotificationQueueService from "../services/NotificationQueueService";

class OrderController {
    async update(req: Request, res: Response) {
        const cService = new CartService()
        const pService = new ProducService()
        const nQService = new NotificationQueueService()

        const {data} = await cService.updateCart(Number(req.params.id))

        await pService.updateProductStock(data.product_id, {mode: "drop", quantity: data.product_amount})

        await nQService.placeNotification()

        return res.status(200).json({ok: "Order created."})
    }
}

export default new OrderController();
