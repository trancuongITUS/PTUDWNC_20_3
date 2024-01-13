import TClassDao from "~/dao/TClassDao";

export default class ClassService {

    public static async createClass(classData: any, owner: any, students: any[]): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.insertClass(classData, owner, students);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getAllClasses(): Promise<any> {
       return await TClassDao.getAllClasses();
    }

    public static async getClassByClassId(classId: number): Promise<any> {
        return await TClassDao.findById(classId);
    }

    public static async getAllClassesAuthenticated(userId: number): Promise<any> {
        return await TClassDao.getAllClassesAuthenticated(userId);
    }

    public static async getAllClassJoined(userId: number): Promise<any> {
        return await TClassDao.getAllClassJoined(userId);
    }

    public static async getGradeStructureByClassId(classId: number): Promise<any> {
        return await TClassDao.getGradeStructureByClassId(classId);
    }

    public static async updateGradeStructure(classId: number, gradeStructure: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.deleteGradeStructureByClassId(classId);
            await TClassDao.insertGradeStructureByClassId(classId, gradeStructure);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getMembersByClassId(classId: number): Promise<any> {
        const TEACHERS = await TClassDao.getTeachersByClassId(classId);
        const STUDENTS = await TClassDao.getStudentsByClassId(classId);

        return {teachers: TEACHERS, students: STUDENTS};
    }

    public static async joinClassByLink(classId: number, user: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.joinClassByLink(classId, user);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async joinClassByCode(invitationCode: string, user: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.joinClassByCode(invitationCode, user);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async markGradeStructureFinalized(classId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.markGradeStructureFinalized(classId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getIsGradeStructureFinalized(classId: number): Promise<boolean> {
        const RESULT = await TClassDao.getIsGradeStructureFinalized(classId);
        return RESULT;
    }

    public static async markStudentsFinalized(classId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.markStudentsFinalized(classId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getIsStudentsFinalized(classId: number): Promise<boolean> {
        const RESULT = await TClassDao.getIsStudentsFinalized(classId);
        return RESULT;
    }

    public static async uploadStudents(students: any[], classId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.uploadStudents(students, classId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async uploadGradeAssignmentBoard(gradeBoard: any[], gradeCompositionId: number, classId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.uploadGradeAssignmentBoard(gradeBoard, gradeCompositionId, classId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getGradeBoardByClassId(classId: number): Promise<any> {
        const GRADE_BOARD = await TClassDao.getGradeBoardByClassId(classId);
        return GRADE_BOARD;
    }

    public static async getGradeCompositionById(id: number): Promise<any> {
        const GRADE_COMPOSITION = await TClassDao.getGradeCompositionById(id);
        return GRADE_COMPOSITION;
    }

    public static async getIsGradeBoardFinalized(classId: number): Promise<boolean> {
        const RESULT = await TClassDao.getIsGradeBoardFinalized(classId);
        return RESULT;
    }

    public static async markGradeBoardFinalized(classId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.markGradeBoardFinalized(classId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getRClassUserByClassIdAndUserId(classId: number, userId: number): Promise<any> {
        const RESULT = await TClassDao.getRClassUserByClassIdAndUserId(classId, userId);
        return RESULT;
    }

    public static async lockClass(classId: number): Promise<boolean> {
        return await TClassDao.lockClass(classId);
    }

    public static async unlockClass(classId: number): Promise<boolean> {
        return await TClassDao.unlockClass(classId);
    }

    public static async updateClassDetail(classId: number, classData: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.updateClassDetail(classId, classData);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async mappingAccountToStudent(classId: number, studentId: string, userId: number): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.mappingAccountToStudent(classId, studentId, userId);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getGradesByIdClassAndIdClassStudent(classId: number, idClassStudent: number): Promise<any> {
        const RESULT = await TClassDao.getGradesByIdClassAndIdClassStudent(classId, idClassStudent);
        return RESULT;
    }

    public static async sendReviewRequest(obj: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.sendReviewRequest(obj);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }

    public static async getCommentsByIdGradeReview(idGradeReview: number): Promise<any> {
        const RESULT = await TClassDao.getCommentsByIdGradeReview(idGradeReview);
        return RESULT;
    }

    public static async uploadComment(comment: any): Promise<boolean> {
        let result = false;
        try {
            await TClassDao.uploadComment(comment);
            result = true;
        } catch (error) {
            console.log(error);
            result = false;
        } finally {
            return result;
        }
    }
}