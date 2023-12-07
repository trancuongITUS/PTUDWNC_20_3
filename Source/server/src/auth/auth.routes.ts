import { Router } from "express";
import AuthController from "./auth.controller";
import AuthMiddlewares from "./auth.middlewares";
import passportConfig from "./passport/passport.config";

class AuthRoutes {
    router = Router();
    authController: AuthController = new AuthController();
    authMiddleware: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();        
    }

    private config() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', passportConfig.authenticate('local'), this.authController.login);
        this.router.get('/google', passportConfig.authenticate('google', {scope: ['profile', 'email']}));
        this.router.get('/google/callback', passportConfig.authenticate('google'));
        this.router.get('/logout', (req, res, next) => {
            req.logout((err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    message: "Logout OK",
                })
            });
        });
        this.router.get("/protected", this.authMiddleware.isAuth, (req, res, next) => {
            return res.json({message: "Vô đây OK"});
        })
    }
}

export default new AuthRoutes().router;