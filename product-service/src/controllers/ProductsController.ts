import { Response, Request } from "express";
import knex from "knex";
import * as knexConfig from "../../knexfile"

class ProductsController {
    async index(req: Request, res: Response) {
        const config = knexConfig as {[key: string]: any}
        const db = knex(config[process.env["NODE_ENV"] || "development"])

        try {
           const data = await db.select().from("products") 

           return res.status(200).json(data)
        } catch (error: any) {
           console.log(error)
           return res.status(500).json({message: error.message, stack: error.stack})
        }
    }
}

export default new ProductsController()
