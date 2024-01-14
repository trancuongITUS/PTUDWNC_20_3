import cors from "cors";
import express, { Application } from "express";
import authRoutes from "./auth/auth.routes";
import DBConnector from "./db/DBConnector";
import userRoutes from "./routes/user.routes";
import classRoutes from "./routes/class.routes";
import cookieParser from "cookie-parser";
import passportConfig from "./auth/passport/passport.config";
import session from "express-session";
import Constants from "./utils/Constants";


export default class Server {


    constructor(app: Application) {
        this.configServer(app);
        this.configPassport(app);
        this.configRoutes(app);
        this.connectDatabase();
    }

    private configServer(app: Application) {
        app.use(cors(Constants.CORS_OPTIONS));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(session(Constants.SESSION_OPTIONS));
    }

    private configRoutes(app: Application) {
        /** Config auth-routes */
        app.use('/api/v1/auth', authRoutes);
        /** Config user-routes */
        app.use('/api/v1/users', userRoutes);
        /** Config class-routes */
        app.use('/api/v1/class', classRoutes);
    }

    private async connectDatabase(): Promise<void> {
        try {
            await DBConnector.getInstance().getConnector().authenticate();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    private configPassport(app: Application) {
        app.use(passportConfig.initialize());
        app.use(passportConfig.session());
    }
}