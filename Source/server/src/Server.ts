import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import authRoutes from "./auth/auth.routes";
import DBConnector from "./db/DBConnector";
import { initModels } from "./models/init-models";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";


export default class Server {


    constructor(app: Application) {
        this.configServer(app);
        this.configRoutes(app);
        this.connectDatabase();
    }

    private configServer(app: Application) {
        const CORS_OPTIONS: CorsOptions = {
            origin: 'http://127.0.0.1:5173',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
        }

        app.use(cors(CORS_OPTIONS));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
    }

    private configRoutes(app: Application) {
        /** Config auth-routes */
        app.use('/auth', authRoutes);
        /** Config user-routes */
        app.use('/users', userRoutes);
    }

    private async connectDatabase(): Promise<void> {
        try {
            await DBConnector.getInstance().getConnector().authenticate();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}