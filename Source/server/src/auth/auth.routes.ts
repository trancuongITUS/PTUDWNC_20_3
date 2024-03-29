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
        this.router.post('/forgot-password', this.authController.forgotPassword);
        this.router.post('/change-password', this.authMiddleware.isAuth, this.authController.changePassword);

        this.router.get('/google', passportConfig.authenticate('google', { scope: ['profile', 'email'] }));
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

                    return res.redirect(`${process.env.CLIENT_URL}/login?redirectAccount=${encodeURIComponent(user.dataValues.username)}`);
                });
            })(req, res, next);
        });

        this.router.get('/verify-email/:codeVerifyEmail', this.authController.verifyEmail);
    }
}

export default new AuthRoutes().router;