import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import MUserDao from "~/dao/MUserDao";
import { MUser, MUserCreationAttributes } from "~/models/MUser";
import Constants from "~/utils/Constants";
import Util from "~/utils/Util";

class PassportConfig {
    passportConfig = new passport.Passport();

    constructor() {
        this.config();
    }

    private config() {
        this.passportConfig.serializeUser((user: any, done) => {
            done(null, user.dataValues.id);
        });

        this.passportConfig.deserializeUser(async (id: number, done) => {
            const USER = await MUserDao.findById(id);
            done(null, USER);
        });

        this.passportConfig.use(new GoogleStrategy(Constants.GOOGLE_OPTIONS, async (accessToken, refreshToken, profile, done) => {
            try {
                const USERNAME = profile._json.email;
                const EMAIL = profile._json.email;
                const FULLNAME = profile._json.name;

                const USER_DB: MUser | null = await MUserDao.findByUsername(USERNAME!);
                if (!Util.isNullOrUndefined(USER_DB)) {
                    if (!USER_DB?.isGoogle) {
                        return done(null, false, {message: "Email has been used!"});
                    }

                    return done(null, USER_DB!);
                }

                const NEW_USER_CREATION_ATTRIBUTES: MUserCreationAttributes = {
                    username: USERNAME!,
                    email: EMAIL!,
                    fullname: FULLNAME,
                    isGoogle: true,
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