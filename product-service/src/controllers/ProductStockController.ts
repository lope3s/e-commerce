import { Request, Response } from "express";
import knex from "knex";
import * as knexConfig from "../../knexfile"

const config = knexConfig as {[key: string]: any}

class ProductStockController {
    async update(req: Request, res: Response) {
        if (req.body.mode !== "drop" && req.body.mode !== "increment") {
            return res.status(400).json({error: "Payload is not right."})
        }

        const db = knex(config[process.env["NODE_ENV"] || "development"])

        try {
           const [product] = await db.select().from("products").where({id: req.params.productID})

           if (!product) {
               return res.status(404).json({error: "Product not found."})
           }

           if (req.body.mode === "drop") {

               if (product.stock - req.body.quantity < 0) {
                   return res.status(400).json({error: "Can't drop the stock below 0"})
               }

               await db.raw("UPDATE products SET stock = stock - ?", req.body.quantity)
               return res.status(200).json({success: "Product updated successfully"})
           }

           await db.raw("UPDATE products SET stock = stock + ?", req.body.quantity)
           return res.status(200).json({success: "Product updated successfully"})
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({message: error.message, stack: error.stack}) 
        }
    }
}

export default new ProductStockController();
