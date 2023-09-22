import {verify} from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

interface Req extends Request {
    [key: string]: any
}

function authMiddleware (req: Req, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (!authorization) return res.status(403).json({error: "No authorization provided"})

    const [_, token] = authorization.split(" ")

    try {
        const decoded = verify(token, process.env["TOKEN_SECRET"] || "")

        req.user = decoded

        return next()
    } catch (error) {
        return res.status(401).json({error: "Invalid token"})
    }
}

export default authMiddleware
