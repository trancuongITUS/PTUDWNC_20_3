import { Request, Response } from "express";
import AuthService from "~/auth/auth.service";
import UserService from "~/services/user.service";

export default class UserController {
    
    async getAllUsers(req: Request, res: Response) {
        const USERS = await UserService.getAllUsers();
        return res.status(200).json({
            message: "Request OK",
            resultList: USERS,
        });
    }

    async getUserByUsername(req: Request, res: Response) {
        const USER = await UserService.getUserByUsername(req.params.username);
        return res.status(200).json({
            message: "Request OK",
            result: USER,
        });
    }

    async getMe(req: Request, res: Response) {
        const USERNAME: string = req.body.user_payload.username;
        const USER = await UserService.getUserByUsername(USERNAME);
        return res.status(200).json({
            message: "Request OK",
            result: USER,
        });
    }

    async updateUser(req: Request, res: Response) {
        const EMAIL: string = req.body.email;
        const FULLNAME: string = req.body.fullname;

        const USERNAME: string = req.body.user_payload.username;

        const IS_UPDATE_SUCCESS: boolean = await AuthService.update(USERNAME, EMAIL, FULLNAME);
        if (!IS_UPDATE_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(201).json({
            message: "Update OK",
        });
        return;
    }
}