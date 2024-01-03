import { NextFunction, Request, Response, Router } from "express";
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
        this.router.post('/login', this.authController.login);
        this.router.post('/logout', this.authController.logout);
        this.router.post('/refresh', this.authMiddleware.verifyRefreshToken, this.authController.refresh);

        this.router.get('/google', passportConfig.authenticate('google', { scope: ['profile', 'email'] }));
        // this.router.get('/google/callback', passportConfig.authenticate('google'));
        this.router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
            passportConfig.authenticate('google', (err: any, user: any, info: any) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect(`http://127.0.0.1:5173/login?redirectAccount=${encodeURIComponent(user.dataValues.username)}`);
                });
            })(req, res, next);
        });
    }
}

export default new AuthRoutes().router;