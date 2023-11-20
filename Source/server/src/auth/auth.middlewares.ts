import { NextFunction, Request, Response } from "express";
import StringUtil from "~/utils/StringUtils";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";

export default class AuthMiddlewares {
    async isAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const ACCESS_TOKEN_FROM_HEADER: string = req.headers.access_token as string;
            if (StringUtil.isEmpty(ACCESS_TOKEN_FROM_HEADER)) {
                res.status(401).json({message: "Don't have permission to access this resource!"});
            }
            
            const SECRET_KEY = process.env.SECRET_KEY;
            const VERIFIED: any = await AuthService.verifyAccessToken(ACCESS_TOKEN_FROM_HEADER, SECRET_KEY!);
            if (!VERIFIED) {
                res.status(401).json({message: "Don't have permission to access this resource!"});
            }

            req.body.user_payload = VERIFIED.payload;
            return next();
        } catch (error: any) {
            console.log(error);
            switch (error.name) {
                case 'TokenExpiredError':
                    res.status(401).send({message: "Unauthorized, token expired!"});
                    break;
                default:
                    res.status(500).send({message: "Internal Server Error."});
                    break;
            }
        }
    }
}