import { NextFunction, Request, Response } from "express";
import StringUtil from "~/utils/StringUtils";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import passportConfig from "./passport/passport.config";

export default class AuthMiddlewares {

    async auth(req: Request, res: Response, next: NextFunction) {
        await passportConfig.authenticate('local', {session: false, authInfo: true}, (err: any, user: any, info: any) => {
            if (!Util.isNullOrUndefined(err)) {
                return res.status(500).send({message: "Internal Server Error."});
            }

            if (Util.isNullOrUndefined(user)) {
                return res.status(401).json({message: info.message});
            }

            if (user) {
                res.cookie('accessToken', user.accessToken);
                res.cookie('refreshToken', user.refreshToken);
                return res.status(200).json({message: info.message});
            } else {
                return res.status(401).json({message: info.message});
            }
        })(req, res, next);

    }

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