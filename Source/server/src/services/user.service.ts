import MUserDao from "~/dao/MUserDao";
import { MUser } from "~/models/MUser";

export default class UserService {

    public static async getAllUsers(): Promise<MUser[]> {
        return await MUserDao.findAll();
    }

    public static async getAllStudents(): Promise<MUser[]> {
        return await MUserDao.findAllStudents();
    }

    public static async getUserByUsername(username: string): Promise<MUser | null> {
        return await MUserDao.findByUsername(username);
    }

    public static async lock(id: number): Promise<boolean> {
        return await MUserDao.lock(id)
    }

    public static async unlock(id: number): Promise<boolean> {
        return await MUserDao.unlock(id)
    }

    public static async delete(id: number): Promise<boolean> {
        return await MUserDao.delete(id)
    }

    public static async mappingIdStudentId(mappingArr: any[]): Promise<string> {
        console.log(mappingArr)
        for (const mapping of mappingArr) {
            const id = mapping.mappingId;
            console.log(id);
            const STUDENT = await MUserDao.findStudentById(id);
            if (!STUDENT) {
                return `Cannot find student with id ${id}`;
            }
        }

        for (const mapping of mappingArr) {
            const id = mapping.mappingId;
            const studentId = mapping.studentId;

            const IS_UPDATE_SUCCESS: boolean = await MUserDao.updateStudentId(id, studentId);
            if (!IS_UPDATE_SUCCESS) {
                return `Cannot update student with id ${id}`;
            }
        }

        return "Upload OK";
    }
}