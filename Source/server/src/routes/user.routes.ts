import { Router } from "express";
import AuthMiddlewares from "~/auth/auth.middlewares";
import UserController from "~/controllers/user.controller";

class UserRoutes {
    router = Router();
    userController: UserController = new UserController();
    authMiddlewares: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/users', this.authMiddlewares.isAuth, this.userController.getAllUsers);
        this.router.get('/user/:username', this.authMiddlewares.isAuth, this.userController.getUserByUsername);
        this.router.post('/update', this.authMiddlewares.isAuth, this.userController.updateUser);
        this.router.get('/user/me', this.authMiddlewares.isAuth, this.userController.getMe);
    }
}

export default new UserRoutes().router;