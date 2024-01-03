import { NextFunction, Request, Response } from "express";
import StringUtil from "~/utils/StringUtils";
import AuthService from "./auth.service";

export default class AuthMiddlewares {
    async isAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const ACCESS_TOKEN_FROM_COOKIE: string = req.cookies.accessToken as string;
            if (StringUtil.isEmpty(ACCESS_TOKEN_FROM_COOKIE)) {
                return res.status(401).json({
                    message: "Don't have permission to access this resource!",
                    isAccessTokenExpired: undefined,
                    isRefreshTokenExpired: undefined,
                });
            }
            
            const SECRET_KEY = process.env.SECRET_KEY;
            const VERIFIED: any = await AuthService.verifyToken(ACCESS_TOKEN_FROM_COOKIE, SECRET_KEY!);
            if (!VERIFIED) {
                return res.status(401).json({
                    message: "Don't have permission to access this resource!",
                    isAccessTokenExpired: undefined,
                    isRefreshTokenExpired: undefined,
                });
            }

            req.body.user_payload = VERIFIED.payload;
            return next();
        } catch (error: any) {
            console.log(error);
            switch (error.name) {
                case 'TokenExpiredError':
                    res.status(401).send({
                        message: "Unauthorized, token expired!",
                        isAccessTokenExpired: true,
                        isRefreshTokenExpired: undefined,
                    });
                    break;
                default:
                    res.status(500).send({message: "Internal Server Error."});
                    break;
            }
        }
    }

    async verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const REFRESH_TOKEN_FROM_COOKIE: string = req.cookies.refreshToken as string;
            if (StringUtil.isEmpty(REFRESH_TOKEN_FROM_COOKIE)) {
                return res.status(401).json({
                    message: "Don't have permission to refresh access token!",
                    isAccessTokenExpired: undefined,
                    isRefreshTokenExpired: undefined,
                });
            }
            
            const SECRET_KEY = process.env.SECRET_KEY;
            const VERIFIED: any = await AuthService.verifyToken(REFRESH_TOKEN_FROM_COOKIE, SECRET_KEY!);
            if (!VERIFIED) {
                return res.status(401).json({
                    message: "Don't have permission to refresh access token!",
                    isAccessTokenExpired: undefined,
                    isRefreshTokenExpired: undefined,
                });
            }
            req.body.payload = VERIFIED.payload;
            return next();
        } catch (error: any) {
            console.log(error);
            switch (error.name) {
                case 'TokenExpiredError':
                    res.status(401).send({
                        message: "Unauthorized, token expired!",
                        isAccessTokenExpired: undefined,
                        isRefreshTokenExpired: false,
                    });
                    break;
                default:
                    res.status(500).send({message: "Internal Server Error."});
                    break;
            }
        }
    }
}