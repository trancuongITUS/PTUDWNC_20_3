import { Router } from "express";
import AuthController from "./auth.controller";
import AuthMiddlewares from "./auth.middlewares";

class AuthRoutes {
    router = Router();
    authController: AuthController = new AuthController();
    authMiddleware: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();        
    }

    private config() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login);
        this.router.post('/logout', this.authController.logout);
        this.router.post('/refresh', this.authMiddleware.verifyRefreshToken, this.authController.refresh);
    }
}

export default new AuthRoutes().router;