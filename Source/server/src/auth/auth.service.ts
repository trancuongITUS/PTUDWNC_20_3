import bcrypt from "bcrypt"
import { Sequelize } from "sequelize";
import MUserDao from "~/dao/MUserDao";
import DBConnector from "~/db/DBConnector";
import { initModels, MUserCreationAttributes } from "~/models/init-models";
import Util from "~/utils/Util";
import { MUser } from "~/models/MUser";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export default class AuthService {

    public static async getUserByUsername(username: string): Promise<MUser | null> {
        return await MUserDao.findByUsername(username); 
    }

    public static async isDuplicateUsername(username: string): Promise<boolean> {

        let result: boolean = true;

        const user = await MUserDao.findByUsername(username);
        if (Util.isNullOrUndefined(user)) {
            result = false;
        }

        return result;
    }

    public static async isDuplicateEmail(email: string): Promise<boolean> {

        let result: boolean = true;

        const user = await MUserDao.findByEmail(email);
        if (Util.isNullOrUndefined(user)) {
            result = false;
        }

        return result;
    }

    public static isValidPassword(password: string, user: MUser) {
        return bcrypt.compareSync(password, user.pwdHash!);
    }

    public static async register(username: string, password: string, email: string, fullname: string): Promise<boolean> {
        let isSuccess: boolean = false;

        try {
            const PASSWORD_HASH = bcrypt.hashSync(password, 10);
            const NEW_USER: MUserCreationAttributes = {
                username: username,
                pwdHash: PASSWORD_HASH,
                email: email,
                fullname: fullname,
                createdDate: new Date(),
                createdUser: 1,
                lastUpdDate: new Date(),
                lastUpdUser: 1
            }

            await MUserDao.create(NEW_USER);
            isSuccess = true;
        } catch (error) {

            console.log(error);
            isSuccess = false;
        } finally {

            return isSuccess;
        }
    }

    public static async update(username: string, email: string, fullname: string): Promise<boolean> {
        let isSuccess: boolean = false;

        try {
            await MUserDao.update(username, email, fullname);
            isSuccess = true;
        } catch (error) {

            console.log(error);
            isSuccess = false;
        } finally {
            return isSuccess;
        }
    }
}