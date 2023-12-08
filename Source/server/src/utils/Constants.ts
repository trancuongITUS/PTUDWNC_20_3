import { CorsOptions } from 'cors';
import { SessionOptions } from 'express-session';
import dotenv from 'dotenv';
import { StrategyOptions as GoogleStrategyOptions } from 'passport-google-oauth20';
import { StrategyOptions as FacebookStrategyOptions } from 'passport-facebook';
dotenv.config();

export default class Constants {
    static readonly CORS_OPTIONS: CorsOptions = {
        origin: 'http://127.0.0.1:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    }

    static readonly SESSION_OPTIONS: SessionOptions = {
        secret: process.env.SESSION_SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }
    }

    static readonly GOOGLE_OPTIONS: GoogleStrategyOptions = {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    }

    static readonly FACEBOOK_OPTIONS: FacebookStrategyOptions = {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
        profileFields: ['id', 'displayName', 'photos', 'email'],
    }
}