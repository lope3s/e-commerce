import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import authMiddleware from "../../../src/middleware/authMiddleware"

describe("Testing authMiddleware", () => {
    const res = {
        status: jest.fn((status: number) => res),
        json: jest.fn((data: object) => res)
    } as unknown as Response

    const next = jest.fn() as unknown as NextFunction

    it("Should call status with status 403 is no token is provided", () => {
        const req = {
            headers: {}
        } as unknown as Request

        authMiddleware(req, res, next)

        const mock = (res.status as jest.Mock).mock 

        const mockJSON = (res.json as jest.Mock).mock

        expect(mock.calls).toHaveLength(1)
        expect(mock.calls[0][0]).toBe(403)
        expect(mockJSON.calls[0][0]).toEqual({error: "No authorization provided"})
    })

    it("Should call status with status 401 if token is invalid", () => {
        const req = {
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1YW4gTG9wZXMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE2OTUzMzY4MjcsImV4cCI6MTY5NTk0MTYyN30.jaNDzfKlnpIlpIAKQuGlagj7sLiGy5dM_Bjhq8SjrDy'
            }
        } as unknown as Request

        authMiddleware(req, res, next)

        const mock = (res.status as jest.Mock).mock 

        const mockJSON = (res.json as jest.Mock).mock

        expect(mock.calls).toHaveLength(2)
        expect(mock.calls[1][0]).toBe(401)
        expect(mockJSON.calls[1][0]).toEqual({error: "Invalid token"})
    })

    it("Should call next fn if everything is ok", () => {
        const req = {
            headers: {
                // Never expiring token
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1YW4gTG9wZXMiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE2OTUzMzc5NTl9.qZILvD5nPutCB_b0SEqdazn9E8nz-DZLaTMvO4DKK34'
            }
        } as unknown as Request

        authMiddleware(req, res, next)

        const mock = (next as jest.Mock).mock 

        expect(mock.calls).toHaveLength(1)
        expect((req as any).user).toEqual({
            iat: 1695337959,
            email: "test@mail.com",
            id: 1,
            name: "Luan Lopes"
        })
    })
})
