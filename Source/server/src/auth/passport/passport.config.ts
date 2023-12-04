import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Util from "~/utils/Util";
import AuthService from "../auth.service";
import { MUser, MUserCreationAttributes } from "~/models/MUser";
import MUserDao from "~/dao/MUserDao";

class PassportConfig {
    passportConfig = new passport.Passport();
    
    constructor() {
        this.config();
    }

    private config() {
        this.passportConfig.serializeUser((user, done) => {
            done(undefined, user);
        });

        this.passportConfig.deserializeUser((user, done) => {
            done(null, false);
        });

        this.passportConfig.use(new LocalStrategy(async (username, password, callback) => {
            try {
                const USER: MUser | null = await AuthService.getUserByUsername(username);
                if (Util.isNullOrUndefined(USER)) {
                    return callback(null, false, {message: "Username does not exists"});
                }
                if (!AuthService.isValidPassword(password, USER!)) {
                    return callback(null, false, {message: "Password does not match"});
                }

                const DATA_FOR_ACCESS_TOKEN: any = {
                    user_id: USER?.id,
                    username: USER?.username,
                    email: USER?.email,
                }
                const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
                if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                    return callback(null, false, {message: "Login failed. Try again!"});
                }

                const DATA_FOR_REFRESH_TOKEN: any = {
                    user_id: USER?.id,
                    username: USER?.username,
                    email: USER?.email,
                    access_token: ACCESS_TOKEN,
                }
                let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
                if (Util.isNullOrUndefined(USER?.refreshToken)) {
                    await AuthService.updateRefreshTokenAndExpiredDateById(USER?.id!, refreshToken);
                } else if (USER?.expiredDate !== null && USER?.expiredDate !== undefined && new Date(USER.expiredDate).getTime() < new Date().getTime()) {
                    await AuthService.updateRefreshTokenAndExpiredDateById(USER?.id!, refreshToken);
                } else {
                    await AuthService.updateRefreshToken(USER?.id!, refreshToken);
                }

                return callback(null, {accessToken: ACCESS_TOKEN, refreshToken: refreshToken}, {message: "Login OK"});
            } catch (error) {
                return callback(error);
            }
        }));

        this.passportConfig.use(new GoogleStrategy({
            clientID: "388894262915-a881ic1vvgqa1q5dr2n6592033fnr1rf.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'https://www.google.com.vn/'
        }, async (accessToken, refreshToken, profile, callback) => {
            try {
                const USERNAME: string = profile._json.email || "";
                const EMAIL: string = profile._json.email || "";
                const FULLNAME: string = profile._json.name || "";

                const IS_DUPLICATE_USERNAME: boolean = await AuthService.isDuplicateUsername(USERNAME);
                if (!IS_DUPLICATE_USERNAME) {
                    const NEW_USER: MUserCreationAttributes = {
                        username: USERNAME,
                        email: EMAIL,
                        fullname: FULLNAME,
                        isGoogle: true,
                        createdDate: new Date(),
                        createdUser: 1,
                        lastUpdDate: new Date(),
                        lastUpdUser: 1,
                    }
                    await MUserDao.create(NEW_USER);

                    const DATA_FOR_ACCESS_TOKEN: any = {
                        username: USERNAME,
                        email: EMAIL,
                    }
                    const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
                    if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                        return callback(null, false, {message: "Login failed. Try again!"});
                    }

                    const DATA_FOR_REFRESH_TOKEN: any = {
                        username: USERNAME,
                        email: EMAIL,
                        access_token: ACCESS_TOKEN,
                    }
                    let refreshToken = await AuthService.generateToken(DATA_FOR_REFRESH_TOKEN, process.env.SECRET_KEY!, process.env.REFRESH_TOKEN_LIFE!);
                    if (Util.isNullOrUndefined(USER?.refreshToken)) {
                        await AuthService.updateRefreshTokenAndExpiredDateById(USER?.id!, refreshToken);
                    } else if (USER?.expiredDate !== null && USER?.expiredDate !== undefined && new Date(USER.expiredDate).getTime() < new Date().getTime()) {
                        await AuthService.updateRefreshTokenAndExpiredDateById(USER?.id!, refreshToken);
                    } else {
                        await AuthService.updateRefreshToken(USER?.id!, refreshToken);
                    }
                }
            } catch (error: any) {
                return callback(error);
            }
        }))
    }
}

export default new PassportConfig().passportConfig;