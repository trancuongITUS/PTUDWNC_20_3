import { Router } from "express";
import AuthMiddlewares from "~/auth/auth.middlewares";
import UserController from "~/controllers/user.controller";
import uploader from "~/multer/multer.config";

class UserRoutes {
    router = Router();
    userController: UserController = new UserController();
    authMiddlewares: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/all', this.authMiddlewares.isAuth, this.userController.getAllUsers);
        this.router.get('/all-students', this.authMiddlewares.isAuth, this.userController.getAllStudents);
        this.router.get('/user/:username', this.authMiddlewares.isAuth, this.userController.getUserByUsername);
        this.router.post('/update', this.authMiddlewares.isAuth, this.userController.updateUser);
        this.router.get('/me', this.authMiddlewares.isAuth, this.userController.getMe);

        this.router.post('/lock', this.authMiddlewares.isAuth, this.userController.lockUser);
        this.router.post('/unlock', this.authMiddlewares.isAuth, this.userController.unlockUser);
        this.router.post('/delete', this.authMiddlewares.isAuth, this.userController.deleteUser);

        this.router.get('/admin/download-mapping-id-studentid-template', this.authMiddlewares.isAuth, this.userController.downloadMappingIdStudentIdTemplate);
        this.router.post('/admin/upload-mapping-id-studentid', this.authMiddlewares.isAuth, uploader.single('file'), this.userController.uploadMappingIdStudentId);
    }
}

export default new UserRoutes().router;