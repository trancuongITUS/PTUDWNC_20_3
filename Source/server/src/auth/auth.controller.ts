import { Request, Response } from "express";
import Util from "~/utils/Util";
import AuthService from "./auth.service";
import transporter from "~/mail/nodemailer.config";
import { getRoleNameById } from "~/enums/role.enum";

export default class AuthController {
    async register(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            const PASSWORD_RAW: string = req.body.password;
            const EMAIL: string = req.body.email;
            const FULLNAME: string = req.body.fullname;
            const ROLE: string = req.body.role;

            /** Check username already exists */
            const IS_DUPLICATE_USERNAME: boolean = await AuthService.isDuplicateUsername(USERNAME);
            if (IS_DUPLICATE_USERNAME) {
                res.status(409).json({message: "Username already exists."});
                return;
            }

            /** Check email already exists */
            const IS_DUPLICATE_EMAIL: boolean = await AuthService.isDuplicateEmail(EMAIL);
            if (IS_DUPLICATE_EMAIL) {
                res.status(409).send({message: "Email already exists."});
                return;
            }

            let codeVerifyEmail = Util.generateRandomString(50);
            codeVerifyEmail += '-';
            codeVerifyEmail += EMAIL;

            const IS_REGISTER_SUCCESS: boolean = await AuthService.register(USERNAME, PASSWORD_RAW, EMAIL, FULLNAME, ROLE, codeVerifyEmail);
            if (!IS_REGISTER_SUCCESS) {
                res.status(500).send({message: "Internal Server Error."});
                return;
            }

            const LINK = `${process.env.SERVER_URL}/auth/verify-email/${codeVerifyEmail}`;
            const MAIL_OPTIONS = {
                from: '',
                to: EMAIL,
                subject: 'Verify your email address',
                text: `Click the following link to verify your email: ${LINK}`
            };
            transporter.sendMail(MAIL_OPTIONS, (error: any, info: any) => {
                if (error) {
                    console.log(error);
                    return res.status(409).send({message: "Can not send email to verify your account."});
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.status(201).json({
                message: "An email has been sent to your inbox, please verify your account using the attached link.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            const PASSWORD_RAW: string = req.body.password;
            const IS_GOOGLE: boolean = req.body.isGoogle;

            const user = await AuthService.getUserByUsername(USERNAME);
            if (Util.isNullOrUndefined(user)) {
                res.status(401).json({message: "Username does not exists"});
                return;
            }

            if (!IS_GOOGLE) {
                const IS_VALID_PASSWORD = AuthService.isValidPassword(PASSWORD_RAW, user!);
                if (!IS_VALID_PASSWORD) {
                    res.status(401).json({message: "Password does not match"});
                    return;
                }
            }

            const DATA_FOR_ACCESS_TOKEN = {
                user_id: user?.id,
                username: user?.username,
                email: user?.email,
                role: getRoleNameById(user?.idRole!),
                isVerifyEmail: user?.isVerifiedEmail,
            }
            const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
            if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                res.status(401).json({message: "Login failed. Try again!"});
                return;
            }

            const DATA_FOR_REFRESH_TOKEN = {
                user_id: user?.id,
                username: user?.username,
                email: user?.email,
                role: getRoleNameById(user?.idRole!),
                isVerifyEmail: user?.isVerifiedEmail,
                access_token: ACCESS_TOKEN,
            }
            let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
            if (Util.isNullOrUndefined(user?.refreshToken) || user?.expiredRefreshToken!?.getTime() < new Date().getTime()) {
                await AuthService.updateRefreshTokenAndExpiredDateById(user?.id!, refreshToken);
            }
            else {
                await AuthService.updateRefreshToken(user?.id!, refreshToken);
            }

            res.cookie('accessToken', ACCESS_TOKEN);
            res.cookie('refreshToken', refreshToken);
            return res.status(200).json({
                message: "Login OK",
                user: {
                    username: user?.username,
                    email: user?.email,
                    fullname: user?.fullname,
                    idRole: user?.idRole,
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const USERNAME: string = req.body.username;
            await AuthService.logout(USERNAME);
            res.status(200).json({
                message: "Logout OK",
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const DATA_FOR_ACCESS_TOKEN = {
                user_id: req.body.payload.user_id,
                username: req.body.payload.username,
                email: req.body.payload.email,
            }
            const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
            if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                res.status(401).json({message: "Generate AccessToken failed. Try again!"});
                return;
            }

            const DATA_FOR_REFRESH_TOKEN = {
                user_id: req.body.payload.user_id,
                username: req.body.payload.username,
                email: req.body.payload.email,
                access_token: ACCESS_TOKEN,
            }
            let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
            await AuthService.updateRefreshToken(DATA_FOR_REFRESH_TOKEN.user_id, refreshToken);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.cookie('accessToken', ACCESS_TOKEN);
            res.cookie('refreshToken', refreshToken);

            res.status(200).json({
                message: "Refresh token OK",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async verifyEmail(req: Request, res: Response) {
        try {
            const CODE_VERIFY_EMAIL = req.params.codeVerifyEmail;
            const EMAIL = CODE_VERIFY_EMAIL.split('-')[1];

            const user = await AuthService.getUserByEmail(EMAIL);
            if (EMAIL === user?.email) {
                await AuthService.verifyEmail(user?.id!);
                res.redirect(process.env.CLIENT_URL || 'http://127.0.0.1:5173/');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const EMAIL = req.body.email;

            const user = await AuthService.getUserByEmail(EMAIL);
            if (Util.isNullOrUndefined(user)) {
                res.status(409).json({message: "Email does not exists"});
                return;
            }

            const RESET_PASSWORD_CODE = Util.generateRandomString(10);
            const MAIL_OPTIONS = {
                from: '',
                to: EMAIL,
                subject: 'Reset your password',
                text: `Your password is reset: ${RESET_PASSWORD_CODE}`
            };
            transporter.sendMail(MAIL_OPTIONS, async (error: any, info: any) => {
                if (error) {
                    console.log(error);
                    res.status(409).send({message: "Can not send email to reset your password."});
                    return;
                } else {
                    console.log('Email sent: ' + info.response);

                    await AuthService.updatePassword(user?.id!, RESET_PASSWORD_CODE);
                    res.status(200).json({
                        message: "An email has been sent to your inbox, please reset your password using password in email.",
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const USER_ID = req.body.user_payload.user_id;
            const OLD_PASSWORD = req.body.oldPassword;
            const NEW_PASSWORD = req.body.newPassword;

            const IS_VALID_OLD_PASSWORD: boolean = await AuthService.isValidOldPassword(USER_ID, OLD_PASSWORD);
            if (!IS_VALID_OLD_PASSWORD) {
                res.status(401).json({message: "Old password does not match"});
                return;
            }

            const IS_CHANGE_PASSWORD_SUCCESS: boolean = await AuthService.updatePassword(USER_ID, NEW_PASSWORD);
            if (!IS_CHANGE_PASSWORD_SUCCESS) {
                res.status(500).send({message: "Internal Server Error."});
                return;
            }

            res.status(200).json({
                message: "Change password OK",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}