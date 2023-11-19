import { Request, Response } from "express";
import Util from "~/utils/Util";
import AuthService from "./auth.service";

export default class AuthController {
    async register(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            const PASSWORD_RAW: string = req.body.password;
            const EMAIL: string = req.body.email;
            const FULLNAME: string = req.body.fullname;

            /** Check username already exists */
            const IS_DUPLICATE_USERNAME: boolean = await AuthService.isDuplicateUsername(USERNAME);
            if (IS_DUPLICATE_USERNAME) {
                res.status(409).json({message: "Username already exists."});
                return;
            }

            /** Check email already already exists */
            const IS_DUPLICATE_EMAIL: boolean = await AuthService.isDuplicateEmail(EMAIL);
            if (IS_DUPLICATE_EMAIL) {
                res.status(409).send({message: "Email already exists."});
                return;
            }

            const IS_REGISTER_SUCCESS: boolean = await AuthService.register(USERNAME, PASSWORD_RAW, EMAIL, FULLNAME);
            if (!IS_REGISTER_SUCCESS) {
                res.status(500).send({message: "Internal Server Error."});
                return;
            }

            res.status(201).json({
                message: "Register OK",
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            const PASSWORD_RAW: string = req.body.password;

            const user = await AuthService.getUserByUsername(USERNAME);
            if (Util.IsNullOrUndefined(user)) {
                res.status(401).json({message: "Username does not exists"});
                return;
            }

            const IS_VALID_PASSWORD = AuthService.isValidPassword(PASSWORD_RAW, user!);
            if (!IS_VALID_PASSWORD) {
                res.status(401).json({message: "Password does not match"});
                return;
            }

            const DATA_FOR_ACCESS_TOKEN = {
                user_id: user?.id,
                username: user?.username,
                email: user?.email,
            }
            const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
            if (Util.IsNullOrUndefined(ACCESS_TOKEN)) {
                res.status(401).json({message: "Login failed. Try again!"});
                return;
            }

            const DATA_FOR_REFRESH_TOKEN = {
                user_id: user?.id,
                username: user?.username,
                email: user?.email,
                access_token: ACCESS_TOKEN,
            }
            let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
            if (Util.IsNullOrUndefined(user?.refreshToken)) {
                await AuthService.updateRefreshTokenById(user?.id!, refreshToken);
            } else {
                refreshToken = user?.refreshToken!;
            }

            res.status(200).json({
                message: "Login OK",
                accessToken: ACCESS_TOKEN,
                refreshToken: refreshToken,
                user: {
                    username: user?.username,
                    email: user?.email,
                    fullname: user?.fullname,
                }
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
        
    }

    async logout(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            await AuthService.logout(USERNAME);
            res.status(200).json({
                message: "Logout OK",
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}