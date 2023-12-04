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
        this.router.post('/login', this.authMiddleware.auth);
        this.router.post('/logout', this.authController.logout);
        this.router.post('/refresh', this.authMiddleware.verifyRefreshToken, this.authController.refresh);

        this.router.get('/google', passportConfig.authenticate('google', {
            scope: ['profile', 'email']
        }))

        this.router.get('/google/callback', passportConfig.authenticate('google'));
    }
}

export default new AuthRoutes().router;