import { Request, Response } from "express";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import passportConfig from "./passport/passport.config";

export default class AuthController {
    async login(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "Login OK",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
    
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
}