import { Request, Response, Router } from "express";
import AuthMiddlewares from "~/auth/auth.middlewares";
import ClassController from "~/controllers/class.controller";
import uploader from "~/multer/multer.config";

class ClassRoutes {
    router = Router();
    classController: ClassController = new ClassController();
    authMiddlewares: AuthMiddlewares = new AuthMiddlewares();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/classes', this.classController.getAllClass);
        this.router.get('/classes-authenticated', this.authMiddlewares.isAuth, this.classController.getAllClassAuthenticated);
        this.router.get('/classes-joined', this.authMiddlewares.isAuth, this.classController.getAllClassJoined);
        this.router.get('/grade-structure/:classId', this.authMiddlewares.isAuth, this.classController.getGradeStructureByClassId);
        this.router.post('/grade-structure/:classId', this.classController.updateGradeStructure);
        this.router.get('/members/:classId', this.authMiddlewares.isAuth, this.classController.getMembersByClassId)
        this.router.get('/create/download-student-for-class-template', this.authMiddlewares.isAuth, this.classController.downloadStudentForClassTemplate);
        this.router.post('/create-class', this.authMiddlewares.isAuth, uploader.single('file'), this.classController.createClass);

        this.router.get('/join-class/:invitationLinkCode', (req: Request, res: Response) => {
            const invitationLinkCode = req.params.invitationLinkCode;
            res.redirect(`http://127.0.0.1:5173/join-class-callback/${invitationLinkCode}`);
        });
        this.router.post('/join-class-by-link', this.authMiddlewares.isAuth, this.classController.joinClassByLink);
        this.router.post('/join-class-by-code', this.authMiddlewares.isAuth, this.classController.joinClassByCode);
        this.router.post('/invite-email', this.authMiddlewares.isAuth, this.classController.inviteEmail);

        this.router.post('/grade-structure-finalized/:classId', this.authMiddlewares.isAuth, this.classController.markGradeStructureFinalized);
        this.router.get('/is-grade-structure-finalized/:classId', this.authMiddlewares.isAuth, this.classController.getIsGradeStructureFinalized);

        this.router.post('/students-finalized/:classId', this.authMiddlewares.isAuth, this.classController.markStudentsFinalized);
        this.router.get('/is-students-finalized/:classId', this.authMiddlewares.isAuth, this.classController.getIsStudentsFinalized);
        this.router.post('/upload-students', this.authMiddlewares.isAuth, uploader.single('file'), this.classController.uploadStudents);

        this.router.get('/grade-board/:classId', this.authMiddlewares.isAuth, this.classController.getGradeBoardByClassId);

        this.router.get('/download-grade-of-assignment-template/:template', this.authMiddlewares.isAuth, this.classController.downloadGradeBoardTemplate);
        this.router.post('/upload-grade-assignment-board', this.authMiddlewares.isAuth, uploader.single('file'), this.classController.uploadGradeAssignmentBoard);

        this.router.post('/grade-board-finalized/:classId', this.authMiddlewares.isAuth, this.classController.markGradeBoardFinalized);
        this.router.get('/is-grade-board-finalized/:classId', this.authMiddlewares.isAuth, this.classController.getIsGradeBoardFinalized);

        this.router.get('/download-grade-board', this.authMiddlewares.isAuth, this.classController.downloadGradeBoard);
        this.router.get('/r-class-user/:classId/:userId', this.authMiddlewares.isAuth, this.classController.getRClassUserByClassIdAndUserId);

        this.router.post('/lock-class', this.authMiddlewares.isAuth, this.classController.lockClass);
        this.router.post('/unlock-class', this.authMiddlewares.isAuth, this.classController.unlockClass);

        this.router.get('/class-detail/:classId', this.authMiddlewares.isAuth, this.classController.getClassById);
        this.router.post('/update-class-detail/:classId', this.authMiddlewares.isAuth, this.classController.updateClassDetail);

        this.router.post('/mapping-account-to-student', this.authMiddlewares.isAuth, this.classController.mappingAccountToStudent);

        this.router.get('/grades-by-id-class-id-class-student/:classId/:idClassStudent', this.authMiddlewares.isAuth, this.classController.getGradesByIdClassAndIdClassStudent);
        this.router.post('/send-review-request', this.authMiddlewares.isAuth, this.classController.sendReviewRequest);
        this.router.get('/comments-by-id-grade-review/:idGradeReview', this.authMiddlewares.isAuth, this.classController.getCommentsByIdGradeReview);
        this.router.post('/upload-comment', this.authMiddlewares.isAuth, this.classController.uploadComment);
    }
}


export default new ClassRoutes().router;