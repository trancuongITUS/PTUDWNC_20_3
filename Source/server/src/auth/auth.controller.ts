import { Request, Response } from "express";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import passportConfig from "./passport/passport.config";

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

            /** Check email already exists */
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

    async refresh(req: Request, res: Response) {
        try {
            console.log(req.body)
            const DATA_FOR_ACCESS_TOKEN = {
                user_id: req.body.payload.user_id,
                username: req.body.payload.username,
                email: req.body.payload.email,
            }
            const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
            if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                res.status(401).json({message: "Generate AccessToken failed. Try again!"});
                return;
            }

            const DATA_FOR_REFRESH_TOKEN = {
                user_id: req.body.payload.user_id,
                username: req.body.payload.username,
                email: req.body.payload.email,
                access_token: ACCESS_TOKEN,
            }
            console.log(DATA_FOR_REFRESH_TOKEN)
            let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
            await AuthService.updateRefreshToken(DATA_FOR_REFRESH_TOKEN.user_id, refreshToken);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.cookie('accessToken', ACCESS_TOKEN);
            res.cookie('refreshToken', refreshToken);

            res.status(200).json({
                message: "Refresh token OK",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}