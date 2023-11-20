import cors from "cors";
import express, { Application } from "express";
import authRoutes from "./auth/auth.routes";
import DBConnector from "./db/DBConnector";
import { initModels } from "./models/init-models";
import userRoutes from "./routes/user.routes";


export default class Server {


    constructor(app: Application) {
        this.configServer(app);
        this.configRoutes(app);
        this.connectDatabase();
    }

    private configServer(app: Application) {
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
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