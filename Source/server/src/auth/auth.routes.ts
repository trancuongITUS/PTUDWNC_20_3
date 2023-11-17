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
    }
}

export default new AuthRoutes().router;