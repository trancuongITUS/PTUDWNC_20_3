import { Router } from "express";
import AuthController from "./auth.controller";

class AuthRoutes {
    router = Router();
    authController: AuthController = new AuthController();

    constructor() {
        this.config();        
    }

    private config() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login);
        this.router.post('/logout', this.authController.logout);
    }
}

export default new AuthRoutes().router;