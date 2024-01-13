import sequelize from "sequelize";
import DBConnector from "~/db/DBConnector";
import { initModels, MUser, TClass, TClassCreationAttributes } from "~/models/init-models";
import Util from "~/utils/Util";

export default class TClassDao {

    private static getDao() {
        return initModels(DBConnector.getInstance().getConnector()).TClass;
    }

    public static async create(obj: TClassCreationAttributes): Promise<void> {
        await this.getDao().create(obj);
    }

    public static async findAll(): Promise<TClass[]> {
        return await this.getDao().findAll();
    }

    public static async findById(id: number): Promise<TClass | null> {
        return await this.getDao().findByPk(id);
    }

    public static async findAllWithPaging(limit: number, offset: number): Promise<any> {
        return await this.getDao().findAndCountAll({
            offset: offset,
            limit: limit,
        });
    }

    public static async getAllClassesAuthenticated(userId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_class.id AS id_class , t_class.class_name, m_user.id AS id_user, m_user.fullname AS owner_name, COALESCE(v_total_student.total_student, 0) as total_student"
            + " FROM r_class_user"
            + " LEFT JOIN t_class ON r_class_user.id_class = t_class.id"
            + " LEFT JOIN m_user ON r_class_user.id_user = m_user.id"
            + " LEFT JOIN (SELECT t_class_student.id_class AS id_class, COALESCE(COUNT(*), 0) AS total_student FROM t_class_student GROUP BY t_class_student.id_class) AS v_total_student ON r_class_user.id_class = v_total_student.id_class"
            + " WHERE r_class_user.is_owner = TRUE AND r_class_user.id_user = ?",
            {
                replacements: [userId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async getAllClassJoined(userId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_class.id AS id_class , t_class.class_name, m_user.id AS id_user, m_user.fullname AS owner_name, COALESCE(v_total_student.total_student, 0) as total_student"
            + " FROM r_class_user"
            + " LEFT JOIN t_class ON r_class_user.id_class = t_class.id"
            + " LEFT JOIN m_user ON r_class_user.id_user = m_user.id"
            + " LEFT JOIN (SELECT t_class_student.id_class AS id_class, COALESCE(COUNT(*), 0) AS total_student FROM t_class_student GROUP BY t_class_student.id_class) AS v_total_student ON r_class_user.id_class = v_total_student.id_class"
            + " WHERE r_class_user.is_owner = FALSE AND r_class_user.id_user = ?",
            {
                replacements: [userId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async getGradeStructureByClassId(classId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_grade_composition.id AS id, t_grade_composition.grade_name, t_grade_composition.grade_scale, t_grade_composition.grade_percent"
            + " FROM t_grade_composition"
            + " WHERE t_grade_composition.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async deleteGradeStructureByClassId(classId: number): Promise<any> {
        await this.getDao().sequelize?.query(
            "DELETE FROM r_class_student_grade WHERE r_class_student_grade.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.DELETE,
                raw: true,
                logging: console.log,
            }
        )
        await this.getDao().sequelize?.query(
            "DELETE FROM t_grade_composition WHERE t_grade_composition.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.DELETE,
                raw: true,
                logging: console.log,
            }
        )
    }

    public static async insertGradeStructureByClassId(classId: number, gradeStructure: any): Promise<any> {
        gradeStructure.forEach(async (element: any) => {
            await this.getDao().sequelize?.query(
                "INSERT INTO t_grade_composition(id_class, grade_name, grade_scale, grade_percent) VALUES (?, ?, ?, ?)",
                {
                    replacements: [classId, element.grade_name, element.grade_scale, element.grade_percent],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        });
        const STUDENT_IDS = await this.getStudentIdsByClassId(classId);
        const GRADE_COMPOSITION_IDS = await this.getGradeCompositionIdsByClassId(classId);
        for (let i = 0; i < STUDENT_IDS.length; i++) {
            for (let j = 0; j < GRADE_COMPOSITION_IDS.length; j++) {
                await this.getDao().sequelize?.query(
                    "INSERT INTO r_class_student_grade(id_class, id_class_student, id_grade_composition, grade) VALUES (?, ?, ?, ?)",
                    {
                        replacements: [classId, STUDENT_IDS[i].id, GRADE_COMPOSITION_IDS[j].id, 0],
                        type: sequelize.QueryTypes.INSERT,
                        raw: true,
                        logging: console.log,
                    }
                )
            }
        }
    }

    private static async getStudentIdsByClassId(classId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_class_student.id FROM t_class_student WHERE t_class_student.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )
        return RESULT_SET;
    }

    public static async getTeachersByClassId(classId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT m_user.id AS id_user, m_user.fullname, m_user.email, m_user.student_id, r_class_user.is_owner FROM r_class_user LEFT JOIN m_user ON r_class_user.id_user = m_user.id WHERE r_class_user.id_class = ? AND m_user.id_role = 3",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )
        return RESULT_SET;
    }

    public static async getStudentsByClassId(classId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT m_user.id AS id_user"
            + ", t_class_student.fullname"
            + ", m_user.email"
            + ", t_class_student.student_id"
            + ", CASE WHEN m_user.email IS NOT NULL THEN TRUE ELSE FALSE END AS is_mapped"
            + " FROM t_class_student LEFT JOIN m_user ON t_class_student.student_id = m_user.student_id"
            + " WHERE t_class_student.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )
        return RESULT_SET;
    }

    public static async insertClass(classData: any, owner: any, students: any[]): Promise<void> {
        const INVITATION_LINK_CODE = Util.generateRandomString(20);
        const INVITATION_CODE = Util.generateRandomString(20);
        const CLASS: TClass = await this.getDao().create({
            className: classData.className,
            classDescription: classData.description,
            gradeScale: 100,
            invitationLinkCode: "",
            invitationCode: "",
            createdDate: new Date(),
            lastUpdDate: new Date(),
            createdUser: owner,
            lastUpdUser: owner,
        });
        await this.getDao().update({
            invitationLinkCode: INVITATION_LINK_CODE,
            invitationCode: INVITATION_CODE,
        }, {
            where: {
                id: CLASS.id,
            }
        })

        await this.getDao().sequelize?.query(
            "INSERT INTO r_class_user(id_class, id_user, is_owner) VALUES (?, ?, ?)",
            {
                replacements: [CLASS.id, owner, true],
                type: sequelize.QueryTypes.INSERT,
                raw: true,
                logging: console.log,
            }
        )
        students.forEach(async (element: any) => {
            await this.getDao().sequelize?.query(
                "INSERT INTO t_class_student(id_class, student_id, fullname) VALUES (?, ?, ?)",
                {
                    replacements: [CLASS.id, element.student_id, element.fullname],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        });
    }

    private static async getGradeCompositionIdsByClassId(classId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_grade_composition.id FROM t_grade_composition WHERE t_grade_composition.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )
        return RESULT_SET;
    }

    public static async joinClassByLink(classId: number, user: any): Promise<void> {
        const CLASS: TClass | null = await this.getDao().findByPk(classId);
        if (CLASS !== null) {
            await this.getDao().sequelize?.query(
                "INSERT INTO r_class_user(id_class, id_user, is_owner) VALUES (?, ?, ?)",
                {
                    replacements: [CLASS.id, user.user_id, false],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        }
    }

    public static async joinClassByCode(invitationCode: string, user: any): Promise<void> {
        const CLASS: any = await this.getDao().sequelize?.query(
            "SELECT t_class.id FROM t_class WHERE t_class.invitation_code = ?", {
                replacements: [invitationCode],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        if (CLASS !== null && CLASS.length > 0) {
            await this.getDao().sequelize?.query(
                "INSERT INTO r_class_user(id_class, id_user, is_owner) VALUES (?, ?, ?)",
                {
                    replacements: [CLASS[0].id, user.user_id, false],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        }
    }

    public static async markGradeStructureFinalized(classId: number): Promise<void> {
        await this.getDao().update({
            isGradeStructureComplete: true,
        }, {
            where: {
                id: classId,
            }
        })
    }

    public static async getIsGradeStructureFinalized(classId: number): Promise<boolean> {
        const CLASS: TClass | null = await this.getDao().findByPk(classId);
        if (CLASS !== null) {
            return CLASS.isGradeStructureComplete!;
        } else {
            return false;
        }
    }

    public static async markStudentsFinalized(classId: number): Promise<void> {
        await this.getDao().update({
            isStudentsComplete: true,
        }, {
            where: {
                id: classId,
            }
        })
    }

    public static async getIsStudentsFinalized(classId: number): Promise<boolean> {
        const CLASS: TClass | null = await this.getDao().findByPk(classId);
        if (CLASS !== null) {
            return CLASS.isStudentsComplete!;
        } else {
            return false;
        }
    }

    public static async uploadStudents(students: any[], classId: number): Promise<void> {
        await this.getDao().sequelize?.query(
            "DELETE FROM t_class_student WHERE t_class_student.id_class = ? AND is_mapped = FALSE",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.DELETE,
                raw: true,
                logging: console.log,
            }
        );

        /* TODO: Chừa những thằng trong danh sách nhưng đã map trong DB sau khi xóa -> INSERT những thằng mới. */

        students.forEach(async (element: any) => {
            await this.getDao().sequelize?.query(
                "INSERT INTO t_class_student(id_class, student_id, fullname) VALUES (?, ?, ?)",
                {
                    replacements: [classId, element.student_id, element.fullname],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        });
    }

    public static async getGradeBoardByClassId(classId: number): Promise<any> {
        const T_GRADE_COMPOSITION = await this.getDao().sequelize?.query(
            "SELECT t_grade_composition.id AS id, t_grade_composition.grade_name, t_grade_composition.grade_scale, t_grade_composition.grade_percent"
            + " FROM t_grade_composition"
            + " WHERE t_grade_composition.id_class = ?",
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        let query = "SELECT id_class, id_class_student, student_id, fullname";
        T_GRADE_COMPOSITION!.forEach((element: any) => {
            query += `, MAX(CASE WHEN id_grade_composition = ${element.id} THEN grade END) AS "${element.grade_name}"`;
        });
        query += " FROM (SELECT r_class_student_grade.id_class, r_class_student_grade.id_class_student, t_class_student.student_id, t_class_student.fullname, t_grade_composition.id as id_grade_composition, r_class_student_grade.grade FROM r_class_student_grade LEFT JOIN t_grade_composition ON r_class_student_grade.id_grade_composition = t_grade_composition.id LEFT JOIN t_class_student ON r_class_student_grade.id_class_student = t_class_student.id WHERE r_class_student_grade.id_class = ?) AS v GROUP BY id_class, id_class_student, student_id, fullname";

        const RESULT_SET: any = await this.getDao().sequelize?.query(
            query,
            {
                replacements: [classId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async getGradeCompositionById(id: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_grade_composition.id AS id, t_grade_composition.grade_name, t_grade_composition.grade_scale, t_grade_composition.grade_percent"
            + " FROM t_grade_composition"
            + " WHERE t_grade_composition.id = ?",
            {
                replacements: [id],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async uploadGradeAssignmentBoard(gradeBoard: any[], gradeCompositionId: number, classId: number): Promise<void> {
        await this.getDao().sequelize?.query(
            "DELETE FROM r_class_student_grade WHERE r_class_student_grade.id_class = ? AND r_class_student_grade.id_grade_composition = ?",
            {
                replacements: [classId, gradeCompositionId],
                type: sequelize.QueryTypes.DELETE,
                raw: true,
                logging: console.log,
            }
        )

        gradeBoard.forEach(async (element: any) => {
            const idClassStudent: any = await this.getDao().sequelize?.query(
                "SELECT t_class_student.id FROM t_class_student WHERE t_class_student.id_class = ? AND t_class_student.student_id = ?",
                {
                    replacements: [classId, element.student_id],
                    type: sequelize.QueryTypes.SELECT,
                    raw: true,
                    logging: console.log,
                }
            )
            await this.getDao().sequelize?.query(
                "INSERT INTO r_class_student_grade(id_class, id_class_student, id_grade_composition, grade) VALUES (?, ?, ?, ?)",
                {
                    replacements: [classId, idClassStudent![0].id, gradeCompositionId, element.grade],
                    type: sequelize.QueryTypes.INSERT,
                    raw: true,
                    logging: console.log,
                }
            )
        })
    }

    public static async markGradeBoardFinalized(classId: number): Promise<void> {
        await this.getDao().update({
            isGradeBoardComplete: true,
        }, {
            where: {
                id: classId,
            }
        })
    }

    public static async getIsGradeBoardFinalized(classId: number): Promise<boolean> {
        const CLASS: TClass | null = await this.getDao().findByPk(classId);
        if (CLASS !== null) {
            return CLASS.isGradeBoardComplete!;
        } else {
            return false;
        }
    }

    public static async getRClassUserByClassIdAndUserId(classId: number, userId: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT r_class_user.id_class, r_class_user.id_user, r_class_user.is_owner, r_class_user.is_student_mapped"
            + " FROM r_class_user"
            + " WHERE r_class_user.id_class = ? AND r_class_user.id_user = ?",
            {
                replacements: [classId, userId],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async getAllClasses(): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT t_class.id, t_class.class_name, t_class.is_active, m_user.fullname as owner"
            + " FROM t_class"
            + " LEFT JOIN r_class_user ON t_class.id = r_class_user.id_class AND r_class_user.is_owner = TRUE"
            + " LEFT JOIN m_user ON r_class_user.id_user = m_user.id",
            {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async lockClass(classId: number): Promise<boolean> {
        const NOW = new Date();

        const IS_LOCK_SUCCESS = await this.getDao().update(
            {isActive: false, lastUpdDate: NOW, lastUpdUser: 1}, {
            where: {
                id: classId,
            }
        });

        return IS_LOCK_SUCCESS[0] > 0;
    }

    public static async unlockClass(classId: number): Promise<boolean> {
        const NOW = new Date();

        const IS_UNLOCK_SUCCESS = await this.getDao().update({
            isActive: true, lastUpdDate: NOW, lastUpdUser: 1
        }, {
            where: {
                id: classId,
            }
        });

        return IS_UNLOCK_SUCCESS[0] > 0;
    }

    public static async updateClassDetail(classId: number, classData: any): Promise<any> {
        const NOW = new Date();

        const IS_UPDATE_SUCCESS = await this.getDao().update({
            className: classData.className,
            classDescription: classData.classDescription,
            lastUpdDate: NOW,
            lastUpdUser: 1,
        }, {
            where: {
                id: classId,
            }
        });

        return IS_UPDATE_SUCCESS[0] > 0;
    }

    public static async mappingAccountToStudent(classId: number, studentId: string, userId: number): Promise<void> {
        await this.getDao().sequelize?.query(
            "UPDATE r_class_user SET is_student_mapped = TRUE WHERE id_class = ? AND id_user = ?",
            {
                replacements: [classId, userId],
                type: sequelize.QueryTypes.UPDATE,
                raw: true,
                logging: console.log,
            }
        )
        await this.getDao().sequelize?.query(
            "UPDATE t_class_student SET is_mapped = TRUE, id_user_mapped = ? WHERE id_class = ? AND student_id = ?",
            {
                replacements: [userId, classId, studentId],
                type: sequelize.QueryTypes.UPDATE,
                raw: true,
                logging: console.log,
            }
        )
    }

    public static async getGradesByIdClassAndIdClassStudent(classId: number, idClassStudent: number): Promise<any> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "SELECT r_class_student_grade.id_class"
            + ", r_class_student_grade.id_class_student"
            + ", r_class_student_grade.id_grade_composition"
            + ", t_grade_composition.grade_name"
            + ", t_grade_review.review_title"
            + ", t_grade_review.student_explanation"
            + ", t_grade_review.student_expectation_grade"
            + ", t_grade_review.id as id_grade_review"
            + " FROM r_class_student_grade"
            + " LEFT JOIN t_grade_composition ON r_class_student_grade.id_grade_composition = t_grade_composition.id"
            + " LEFT JOIN t_grade_review ON r_class_student_grade.id_class = t_grade_review.id_class AND r_class_student_grade.id_class_student = t_grade_review.id_class_student AND r_class_student_grade.id_grade_composition = t_grade_review.id_grade_composition"
            + " WHERE r_class_student_grade.id_class = ? AND r_class_student_grade.id_class_student = ?",
            {
                replacements: [classId, idClassStudent],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async sendReviewRequest(param: any): Promise<void> {
        const RESULT_SET: any = await this.getDao().sequelize?.query(
            "INSERT INTO t_grade_review(id_class, id_class_student, id_grade_composition, review_title, student_explanation, student_expectation_grade) VALUES (?, ?, ?, ?, ?, ?)",
            {
                replacements: [param.id_class, param.id_class_student, param.id_grade_composition, param.review_title, param.student_explanation, param.student_expectation_grade],
                type: sequelize.QueryTypes.INSERT,
                raw: true,
                logging: console.log,
            }
        )

        return RESULT_SET;
    }

    public static async getCommentsByIdGradeReview(idGradeReview: number): Promise<any> {
        await this.getDao().sequelize?.query(
            "SELECT t_grade_review_comment.id, t_grade_review_comment.id_grade_review, t_grade_review_comment.id_user, t_grade_review_comment.comment_content, m_user.fullname"
            + " FROM t_grade_review_comment"
            + " LEFT JOIN m_user ON t_grade_review_comment.id_user = m_user.id"
            + " WHERE t_grade_review_comment.id_grade_review = ?",
            {
                replacements: [idGradeReview],
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                logging: console.log,
            }
        )
    }

    public static async uploadComment(comment: any): Promise<void> {
        await this.getDao().sequelize?.query(
            "INSERT INTO t_grade_review_comment(id_grade_review, id_user, comment_content) VALUES (?, ?, ?)",
            {
                replacements: [comment.id_grade_review, comment.user_payload.user_id, comment.comment_content],
                type: sequelize.QueryTypes.INSERT,
                raw: true,
                logging: console.log,
            }
        )
    }
}