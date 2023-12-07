import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Util from "~/utils/Util";
import AuthService from "../auth.service";
import { MUser, MUserCreationAttributes } from "~/models/MUser";
import MUserDao from "~/dao/MUserDao";
import Constants from "~/utils/Constants";

class PassportConfig {
    passportConfig = new passport.Passport();
    
    constructor() {
        this.config();
    }

    private config() {
        this.passportConfig.serializeUser((user: any, done) => {
            done(undefined, user.dataValues.id);
        });

        this.passportConfig.deserializeUser(async (id: number, done) => {
            const USER = await MUserDao.findById(id);
            done(null, USER);
        });

        this.passportConfig.use(new LocalStrategy(async (username, password, done) => {
            try {
                const USER_DB: MUser | null = await MUserDao.findByUsername(username);
                if (Util.isNullOrUndefined(USER_DB)) {
                    return done(null, false, {message: "Username doesn't exists."});
                }

                if (!AuthService.isValidPassword(password, USER_DB!)) {
                    return done(null, false, {message: "Password doesn't match."});
                }

                return done(null, USER_DB!);
            } catch (error: any) {
                return done(error);
            }
        }));

        this.passportConfig.use(new GoogleStrategy(Constants.GOOGLE_OPTIONS, async (accessToken, refreshToken, profile, done) => {
            try {
                if (Util.isNullOrUndefined(profile)) {
                    return done(null, false, {message: "Can't connect to Google."})
                }
                
                const GOOGLE_ID = profile.id;
                const USERNAME = profile._json.email;
                const EMAIL = profile._json.email;
                const FULLNAME = profile._json.name;

                const USER_DB: MUser | null = await MUserDao.findByUsername(USERNAME!);
                if (!Util.isNullOrUndefined(USER_DB)) {
                    return done(null, USER_DB!);
                }

                const NEW_USER_CREATION_ATTRIBUTES: MUserCreationAttributes = {
                    username: USERNAME!,
                    email: EMAIL!,
                    fullname: FULLNAME,
                    isGoogle: true,
                    googleId: GOOGLE_ID,
                    isVerified: true,
                    createdDate: new Date(),
                    createdUser: 1,
                    lastUpdDate: new Date(),
                    lastUpdUser: 1,
                }
                const NEW_USER = await MUserDao.create(NEW_USER_CREATION_ATTRIBUTES);

                return done(null, NEW_USER!);
            } catch (error: any) {
                return done(error);
            }
        }))
    }
}

export default new PassportConfig().passportConfig;