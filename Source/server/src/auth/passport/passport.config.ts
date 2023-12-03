import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import Util from "~/utils/Util";
import AuthService from "../auth.service";

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
                const USER = await AuthService.getUserByUsername(username);
                if (Util.isNullOrUndefined(USER)) {
                    return callback(null, false, {message: "Username does not exists"});
                }
                if (!AuthService.isValidPassword(password, USER!)) {
                    return callback(null, false, {message: "Password does not match"});
                }

                const DATA_FOR_ACCESS_TOKEN = {
                    user_id: USER?.id,
                    username: USER?.username,
                    email: USER?.email,
                }
                const ACCESS_TOKEN = await AuthService.generateToken(DATA_FOR_ACCESS_TOKEN, process.env.SECRET_KEY!, process.env.ACCESS_TOKEN_LIFE!);
                if (Util.isNullOrUndefined(ACCESS_TOKEN)) {
                    return callback(null, false, {message: "Login failed. Try again!"});
                }

                const DATA_FOR_REFRESH_TOKEN = {
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
    }
}

export default new PassportConfig().passportConfig;