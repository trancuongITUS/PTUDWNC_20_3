import MUserDao from "~/dao/MUserDao";
import { MUser } from "~/models/MUser";

export default class UserService {

    public static async getAllUsers(): Promise<MUser[]> {
        return await MUserDao.findAll();
    }

    public static async getUserByUsername(username: string): Promise<MUser | null> {
        return await MUserDao.findByUsername(username);
    }
}