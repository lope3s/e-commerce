import { Request, Response } from "express";
import cartItemValidator from "../validators/cartItemValidator";
import CartService from "../services/CartService";

class CartController {
    async store(req: Request, res: Response) {
        const isPayloadValid = cartItemValidator(req.body)

        if(!isPayloadValid) return res.status(400).json({error: "Payload is not right."})

        const cartService = new CartService()

        const cartItem = await cartService.createItem(req.body)

        return res.status(201).json(cartItem)
    }

    async index(req: Request, res: Response) {
        if (!req.query.user_id) return res.status(400).json({error: "No user_id provided."})

        const cartService = new CartService()

        const userItems = await cartService.getUserItems(Number(req.query.user_id))

        return res.status(200).json(userItems)
    }

    async buy(req: Request, res: Response) {
        const cartService = new CartService()

        const item = await cartService.getItem(Number(req.params.id))
        
        if (!item) return res.status(404).json({error: "Item not found."})

        await cartService.dropItem(Number(req.params.id))

        return res.status(200).json(item)
    }
}

export default new CartController();
