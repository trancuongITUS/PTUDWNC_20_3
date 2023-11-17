import { Request, Response } from "express";

export default class AuthController {
    async register(req: Request, res: Response) {
        try {
            res.status(201).json({
                message: "Register OK",
                reqBody: req.body
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async login(req: Request, res: Response) {

    }
}