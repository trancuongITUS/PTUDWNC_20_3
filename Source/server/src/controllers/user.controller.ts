import { Request, Response } from "express";
import AuthService from "~/auth/auth.service";
import UserService from "~/services/user.service";
import ExcelJS from "exceljs";

export default class UserController {
    
    async getAllUsers(req: Request, res: Response) {
        const USERS = await UserService.getAllUsers();
        return res.status(200).json({
            message: "Request OK",
            resultList: USERS,
        });
    }

    async getAllStudents(req: Request, res: Response) {
        const STUDENTS = await UserService.getAllStudents();
        return res.status(200).json({
            message: "Request OK",
            resultList: STUDENTS,
        });
    }

    async getUserByUsername(req: Request, res: Response) {
        const USER = await UserService.getUserByUsername(req.params.username);
        return res.status(200).json({
            message: "Request OK",
            result: USER,
        });
    }

    async getMe(req: Request, res: Response) {
        const USERNAME: string = req.body.user_payload.username;
        const USER = await UserService.getUserByUsername(USERNAME);
        return res.status(200).json({
            message: "Request OK",
            result: USER,
        });
    }

    async updateUser(req: Request, res: Response) {
        const EMAIL: string = req.body.email;
        const FULLNAME: string = req.body.fullname;

        const USERNAME: string = req.body.user_payload.username;

        const IS_UPDATE_SUCCESS: boolean = await AuthService.update(USERNAME, EMAIL, FULLNAME);
        if (!IS_UPDATE_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(201).json({
            message: "Update OK",
        });
        return;
    }

    async lockUser(req: Request, res: Response) {
        const USER_ID = req.body.userId;
        const IS_LOCK_SUCCESS: boolean = await UserService.lock(USER_ID);
        if (!IS_LOCK_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(200).json({
            message: "Lock OK",
        });
    }

    async unlockUser(req: Request, res: Response) {
        const USER_ID = req.body.userId;
        const IS_LOCK_SUCCESS: boolean = await UserService.unlock(USER_ID);
        if (!IS_LOCK_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(200).json({
            message: "Lock OK",
        });
    }

    async deleteUser(req: Request, res: Response) {
        const USER_ID = req.body.userId;
        const IS_LOCK_SUCCESS: boolean = await UserService.delete(USER_ID);
        if (!IS_LOCK_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(200).json({
            message: "Lock OK",
        });
    }

    async downloadMappingIdStudentIdTemplate(req: Request, res: Response) {
        res.download('./src/templates/MappingID_StudentID_Template.xlsx');
    }

    async uploadMappingIdStudentId(req: Request, res: Response) {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.readFile(req.file!.path).then(async () => {

            const worksheet = workbook.getWorksheet(1);
            const ROW_COUNT = worksheet!.rowCount;
            const COLUMN_COUNT = worksheet!.columnCount;
            const MAPPING_ID_STUDENT_ID: any[] = [];
            for (let i = 2; i <= ROW_COUNT; i++) {
                const MAPPING_ID = worksheet!.getCell(`A${i}`).value;
                const STUDENT_ID = worksheet!.getCell(`B${i}`).value as string;
                if (MAPPING_ID && STUDENT_ID) {
                    MAPPING_ID_STUDENT_ID.push({
                        mappingId: MAPPING_ID,
                        studentId: STUDENT_ID,
                    });
                }
            }

            const MESSAGE: string = await UserService.mappingIdStudentId(MAPPING_ID_STUDENT_ID);
            res.status(200).json({
                message: MESSAGE,
            });
        });
    }
}