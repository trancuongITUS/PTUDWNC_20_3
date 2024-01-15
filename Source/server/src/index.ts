import cors from "cors";
import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import Server from './Server';

dotenv.config({ path: __dirname + `/../.env.${process.env.NODE_ENV}`, override: true});
const APP: Application = express();
const SERVER: Server = new Server(APP);
const PORT = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 8080;

APP.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});