import { Request, Response } from "express";
import ClassService from "~/services/class.service";
import Util from "~/utils/Util";
import ExcelJS from "exceljs";
import UserService from "~/services/user.service";
import AuthService from "~/auth/auth.service";
import transporter from "~/mail/nodemailer.config";

export default class ClassController {

    async createClass(req: Request, res: Response) {
        try {
            const CLASS_DATA = req.body;
            const owner = Number(req.body.owner);
            const STUDENT_LIST: any[] = [];

            const workbook = new ExcelJS.Workbook();
            workbook.xlsx.readFile(req.file!.path).then(async () => {
                const worksheet = workbook.getWorksheet(1);
                const ROW_COUNT = worksheet!.rowCount;
                const COLUMN_COUNT = worksheet!.columnCount;
                for (let i = 2; i < ROW_COUNT; i++) {
                    const STUDENT_ID = worksheet!.getCell(`A${i}`).value as string;
                    const FULLNAME = worksheet!.getCell(`B${i}`).value as string;
                    if (STUDENT_ID && FULLNAME) {
                        STUDENT_LIST.push({student_id: STUDENT_ID, fullname: FULLNAME});
                    }
                }
                const IS_CREATE_SUCCESS: boolean = await ClassService.createClass(CLASS_DATA, owner, STUDENT_LIST);
                if (IS_CREATE_SUCCESS) {
                    res.status(200).json({message: "Create Class Success."});
                } else {
                    res.status(500).json({message: "Create Class Failed."});
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
        
    }

    async getAllClass(req: Request, res: Response) {
        const USERS = await ClassService.getAllClasses();
        return res.status(200).json({
            message: "Request OK",
            resultList: USERS,
        });
    }

    async getAllClassAuthenticated(req: Request, res: Response) {
        try {
            let resultSet = await ClassService.getAllClassesAuthenticated(req.body.user_payload.user_id);
            let responseBody: any = {};
            if (Util.isNullOrUndefined(resultSet) || 0 === resultSet.length) {
                responseBody = {
                    message: "Request OK",
                    hasData: false,
                    resultList: [],
                    totalRecords: 0,
                }
            } else {
                responseBody = {
                    message: "Request OK",
                    hasData: true,
                    resultList: resultSet,
                    totalRecords: resultSet.length,
                }
            }
            res.status(200).json(responseBody);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async getAllClassJoined(req: Request, res: Response) {
        try {
            let resultSet = await ClassService.getAllClassJoined(req.body.user_payload.user_id);
            let responseBody: any = {};
            if (Util.isNullOrUndefined(resultSet) || 0 === resultSet.length) {
                responseBody = {
                    message: "Request OK",
                    hasData: false,
                    resultList: [],
                    totalRecords: 0,
                }
            } else {
                responseBody = {
                    message: "Request OK",
                    hasData: true,
                    resultList: resultSet,
                    totalRecords: resultSet.length,
                }
            }
            res.status(200).json(responseBody);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async getGradeStructureByClassId(req: Request, res: Response) {
        try {
            let resultSet = await ClassService.getGradeStructureByClassId(Number(req.params.classId));
            let responseBody: any = {};
            if (Util.isNullOrUndefined(resultSet) || 0 === resultSet.length) {
                responseBody = {
                    message: "Request OK",
                    hasData: false,
                    resultList: [],
                    totalRecords: 0,
                }
            } else {
                responseBody = {
                    message: "Request OK",
                    hasData: true,
                    resultList: resultSet,
                    totalRecords: resultSet.length,
                }
            }

            res.status(200).json(responseBody);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async updateGradeStructure(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const GRADE_STRUCTURE = req.body;
            await ClassService.updateGradeStructure(CLASS_ID, GRADE_STRUCTURE);
            res.status(200).json({message: "Update Grade Structure Success."});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async getMembersByClassId(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            let resultSet = await ClassService.getMembersByClassId(CLASS_ID);
            let responseBody: any = {};
            if (Util.isNullOrUndefined(resultSet)) {
                responseBody = {
                    message: "Request OK",
                    hasData: false,
                    teachers: [],
                    students: [],
                }
            } else {
                responseBody = {
                    message: "Request OK",
                    hasData: true,
                    teachers: resultSet.teachers,
                    students: resultSet.students,
                }
            }

            res.status(200).json(responseBody);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async downloadStudentForClassTemplate(req: Request, res: Response) {
        res.download('./src/templates/UploadStudentForClassTemplate.xlsx');
    }

    async downloadGradeBoardTemplate(req: Request, res: Response) {
        const GRADE_COMPOSITION = await ClassService.getGradeCompositionById(Number(req.params.template));
        const GRADE_COMPOSITION_ID = GRADE_COMPOSITION[0].id;
        const GRADE_COMPOSITION_NAME = GRADE_COMPOSITION[0].grade_name;

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('./src/templates/GradeBoardTemplate.xlsx');
        const worksheet = workbook.getWorksheet(1);
        worksheet!.getCell('B1').value = `${GRADE_COMPOSITION_ID}`;
        worksheet!.getCell('B2').value = `${GRADE_COMPOSITION_NAME}`;
        await workbook.xlsx.writeFile('./src/templates/GradeBoardTemplate.xlsx');
        res.download('./src/templates/GradeBoardTemplate.xlsx');
    }

    async joinClassByLink(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.body.classId);
            const USER = req.body.user_payload;
            const IS_JOIN_SUCCESS = await ClassService.joinClassByLink(CLASS_ID, USER);
            if (IS_JOIN_SUCCESS) {
                res.status(200).json({success: true, message: "Join Class Success."});
            } else {
                res.status(500).json({success: false, message: "Join Class Failed."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async joinClassByCode(req: Request, res: Response) {
        try {
            const INVITATION_CODE = req.body.invitationCode;
            const USER = req.body.user_payload;
            const IS_JOIN_SUCCESS = await ClassService.joinClassByCode(INVITATION_CODE, USER);
            if (IS_JOIN_SUCCESS) {
                res.status(200).json({success: true, message: "Join Class Success."});
            } else {
                res.status(500).json({success: false, message: "Join Class Failed."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async inviteEmail(req: Request, res: Response) {
        const EMAIL = req.body.email;
        const USER_BY_EMAIL = await AuthService.getUserByEmail(EMAIL);
        if (Util.isNullOrUndefined(USER_BY_EMAIL)) {
            return res.status(409).send({success: false, message: "Email not exist."});
        }

        const CLASS_ID = req.body.classId;
        const CLASS_BY_ID = await ClassService.getClassByClassId(CLASS_ID);
        if (Util.isNullOrUndefined(CLASS_BY_ID)) {
            return res.status(409).send({success: false, message: "Class not exist."});
        }
        const LINK = `http://localhost:8080/class/join-class/${CLASS_BY_ID.invitationLinkCode}`;
        const MAIL_OPTIONS = {
            from: '',
            to: EMAIL,
            subject: `Invitation to class: ${CLASS_BY_ID.className}`,
            text: `Click the following link to join: ${LINK}`
        };
        transporter.sendMail(MAIL_OPTIONS, (error: any, info: any) => {
            if (error) {
                console.log(error);
                return res.status(409).send({success: false, message: "Can not send email."});
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({success: true, message: "Invite Email Success."});
    }

    async markGradeStructureFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            await ClassService.markGradeStructureFinalized(CLASS_ID);
            res.status(200).json({success: true, message: "Mark Grade Structure Finalized Success."});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Internal Server Error."});
        }
    }

    async getIsGradeStructureFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const IS_FINALIZED = await ClassService.getIsGradeStructureFinalized(CLASS_ID);
            res.status(200).json({isFinalized: IS_FINALIZED});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async markStudentsFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            await ClassService.markStudentsFinalized(CLASS_ID);
            res.status(200).json({success: true, message: "Mark Students Finalized Success."});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Internal Server Error."});
        }
    }

    async getIsStudentsFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const IS_FINALIZED = await ClassService.getIsStudentsFinalized(CLASS_ID);
            res.status(200).json({isFinalized: IS_FINALIZED});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async uploadStudents(req: Request, res: Response) {
        const STUDENT_LIST: any[] = [];
        const CLASS_ID = Number(req.body.classId);
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.readFile(req.file!.path).then(async () => {
            const worksheet = workbook.getWorksheet(1);
            const ROW_COUNT = worksheet!.rowCount;
            const COLUMN_COUNT = worksheet!.columnCount;
            for (let i = 2; i < ROW_COUNT; i++) {
                const STUDENT_ID = worksheet!.getCell(`A${i}`).value as string;
                const FULLNAME = worksheet!.getCell(`B${i}`).value as string;
                if (STUDENT_ID && FULLNAME) {
                    STUDENT_LIST.push({student_id: STUDENT_ID, fullname: FULLNAME});
                }
            }

            const IS_UPLOAD_SUCCESS: boolean = await ClassService.uploadStudents(STUDENT_LIST, CLASS_ID);
            if (IS_UPLOAD_SUCCESS) {
                res.status(200).json({success: true, message: "Create Class Success."});
            } else {
                res.status(500).json({success: false, message: "Create Class Failed."});
            }
        });
    }

    async uploadGradeAssignmentBoard(req: Request, res: Response) {
        const CLASS_ID = Number(req.body.classId);
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.readFile(req.file!.path).then(async () => {
            const worksheet = workbook.getWorksheet(1);
            const ROW_COUNT = worksheet!.rowCount;
            const COLUMN_COUNT = worksheet!.columnCount;
            const GRADE_COMPOSITION_ID = worksheet!.getCell(`B1`).value as number;
            const GRADE_BOARD: any[] = [];
            for (let i = 4; i < ROW_COUNT; i++) {
                const STUDENT_ID = worksheet!.getCell(`A${i}`).value?.toString();
                const GRADE = worksheet!.getCell(`B${i}`).value as number;
                if (STUDENT_ID && GRADE) {
                    GRADE_BOARD.push({student_id: STUDENT_ID, grade: GRADE});
                }
            }

            const IS_UPLOAD_SUCCESS: boolean = await ClassService.uploadGradeAssignmentBoard(GRADE_BOARD, GRADE_COMPOSITION_ID, CLASS_ID);
            if (IS_UPLOAD_SUCCESS) {
                res.status(200).json({success: true, message: "Create Class Success."});
            } else {
                res.status(500).json({success: false, message: "Create Class Failed."});
            }
        });
    }

    async getGradeBoardByClassId(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const GRADE_BOARD = await ClassService.getGradeBoardByClassId(CLASS_ID);
            res.status(200).json(GRADE_BOARD);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async markGradeBoardFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            await ClassService.markGradeBoardFinalized(CLASS_ID);
            res.status(200).json({success: true, message: "Mark Grade Structure Finalized Success."});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Internal Server Error."});
        }
    }

    async getIsGradeBoardFinalized(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const IS_FINALIZED = await ClassService.getIsGradeBoardFinalized(CLASS_ID);
            res.status(200).json({isFinalized: IS_FINALIZED});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async downloadGradeBoard(req: Request, res: Response) {
        res.download('./src/templates/GradeBoardExport.xlsx');
    }

    async getRClassUserByClassIdAndUserId(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const USER_ID = Number(req.params.userId);
            const R_CLASS_USER = await ClassService.getRClassUserByClassIdAndUserId(CLASS_ID, USER_ID);
            res.status(200).json(R_CLASS_USER);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async lockClass(req: Request, res: Response) {
        const CLASS_ID = req.body.classId;
        const IS_LOCK_SUCCESS: boolean = await ClassService.lockClass(CLASS_ID);
        if (!IS_LOCK_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(200).json({
            message: "Lock OK",
        });
    }

    async unlockClass(req: Request, res: Response) {
        const CLASS_ID = req.body.classId;
        const IS_UNLOCK_SUCCESS: boolean = await ClassService.unlockClass(CLASS_ID);
        if (!IS_UNLOCK_SUCCESS) {
            res.status(500).send({message: "Internal Server Error."});
            return;
        }

        res.status(200).json({
            message: "Lock OK",
        });
    }

    async getClassById(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const CLASS = await ClassService.getClassByClassId(CLASS_ID);
            res.status(200).json(CLASS);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async updateClassDetail(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const CLASS_DATA = req.body.classDetail;
            await ClassService.updateClassDetail(CLASS_ID, CLASS_DATA);
            res.status(200).json({success: true, message: "Update Class Detail Success."});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Internal Server Error."});
        }
    }

    async mappingAccountToStudent(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.body.classId);
            const STUDENT_ID = req.body.studentId;
            const USER_ID = Number(req.body.userId);
            const IS_MAPPING_SUCCESS = await ClassService.mappingAccountToStudent(CLASS_ID, STUDENT_ID, USER_ID);
            if (IS_MAPPING_SUCCESS) {
                res.status(200).json({success: true, message: "Mapping Account To Student Success."});
            } else {
                res.status(500).json({success: false, message: "Mapping Account To Student Failed."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Internal Server Error."});
        }
    }

    async getGradesByIdClassAndIdClassStudent(req: Request, res: Response) {
        try {
            const CLASS_ID = Number(req.params.classId);
            const ID_CLASS_STUDENT = Number(req.params.idClassStudent);
            const GRADES = await ClassService.getGradesByIdClassAndIdClassStudent(CLASS_ID, ID_CLASS_STUDENT);
            res.status(200).json(GRADES);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async sendReviewRequest(req: Request, res: Response) {
        try {
            const REVIEW_REQUEST = await ClassService.sendReviewRequest(req.body);
            res.status(200).json(REVIEW_REQUEST);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async getCommentsByIdGradeReview(req: Request, res: Response) {
        try {
            const ID_GRADE_REVIEW = Number(req.params.idGradeReview);
            const COMMENTS = await ClassService.getCommentsByIdGradeReview(ID_GRADE_REVIEW);
            console.log(COMMENTS)
            if (Util.isNullOrUndefined(COMMENTS)) {
                return res.status(200).json([]);
            }

            res.status(200).json(COMMENTS);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }

    async uploadComment(req: Request, res: Response) {
        try {
            const COMMENT = await ClassService.uploadComment(req.body);
            res.status(200).json(COMMENT);
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal Server Error."});
        }
    }
}