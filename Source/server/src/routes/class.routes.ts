import { Router } from "express";
import AuthMiddlewares from "~/auth/auth.middlewares";
import ClassController from "~/controllers/class.controller";

class ClassRoutes {
    router = Router();
    classController: ClassController = new ClassController();
    authMiddlewares: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/classes', this.classController.getAllClass);
    }
}


export default new ClassRoutes().router;