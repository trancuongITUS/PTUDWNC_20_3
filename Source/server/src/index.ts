import cors from "cors";
import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import Server from './Server';

dotenv.config();
const APP: Application = express();
APP.use(cors())
const SERVER: Server = new Server(APP);
const PORT = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 8080;

APP.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});