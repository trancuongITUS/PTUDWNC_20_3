import cors from "cors";
import express, { Application } from "express";
import authRoutes from "./auth/auth.routes";


export default class Server {


    constructor(app: Application) {
        this.configServer(app);
        this.configRoutes(app);
    }

    private configServer(app: Application) {
        const CORS_OPTIONS = {

        }

        app.use(cors(CORS_OPTIONS));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }

    private configRoutes(app: Application) {
        /** Config auth-routes */
        app.use('/auth', authRoutes);
    }
}