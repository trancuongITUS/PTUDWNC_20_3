import { NextFunction, Request, Response } from "express";
import StringUtil from "~/utils/StringUtils";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import passportConfig from "./passport/passport.config";

export default class AuthMiddlewares {

    async isAuth(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.isAuthenticated()) {
                return next();
            }

            return res.status(401).json({
                message: "Don't have permission to access this resource!"
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}