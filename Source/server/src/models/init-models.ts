import type { Sequelize } from "sequelize";
import { MRole as _MRole } from "./MRole";
import type { MRoleAttributes, MRoleCreationAttributes } from "./MRole";
import { MUser as _MUser } from "./MUser";
import type { MUserAttributes, MUserCreationAttributes } from "./MUser";
import { RClassStudentGrade as _RClassStudentGrade } from "./RClassStudentGrade";
import type { RClassStudentGradeAttributes, RClassStudentGradeCreationAttributes } from "./RClassStudentGrade";
import { RClassUser as _RClassUser } from "./RClassUser";
import type { RClassUserAttributes, RClassUserCreationAttributes } from "./RClassUser";
import { TClass as _TClass } from "./TClass";
import type { TClassAttributes, TClassCreationAttributes } from "./TClass";
import { TClassStudent as _TClassStudent } from "./TClassStudent";
import type { TClassStudentAttributes, TClassStudentCreationAttributes } from "./TClassStudent";
import { TGradeComposition as _TGradeComposition } from "./TGradeComposition";
import type { TGradeCompositionAttributes, TGradeCompositionCreationAttributes } from "./TGradeComposition";
import { TGradeReview as _TGradeReview } from "./TGradeReview";
import type { TGradeReviewAttributes, TGradeReviewCreationAttributes } from "./TGradeReview";
import { TGradeReviewComment as _TGradeReviewComment } from "./TGradeReviewComment";
import type { TGradeReviewCommentAttributes, TGradeReviewCommentCreationAttributes } from "./TGradeReviewComment";

export {
    _MRole as MRole,
    _MUser as MUser,
    _RClassStudentGrade as RClassStudentGrade,
    _RClassUser as RClassUser,
    _TClass as TClass,
    _TClassStudent as TClassStudent,
    _TGradeComposition as TGradeComposition,
    _TGradeReview as TGradeReview,
    _TGradeReviewComment as TGradeReviewComment,
};

export type {
    MRoleAttributes,
    MRoleCreationAttributes,
    MUserAttributes,
    MUserCreationAttributes,
    RClassStudentGradeAttributes,
    RClassStudentGradeCreationAttributes,
    RClassUserAttributes,
    RClassUserCreationAttributes,
    TClassAttributes,
    TClassCreationAttributes,
    TClassStudentAttributes,
    TClassStudentCreationAttributes,
    TGradeCompositionAttributes,
    TGradeCompositionCreationAttributes,
    TGradeReviewAttributes,
    TGradeReviewCreationAttributes,
    TGradeReviewCommentAttributes,
    TGradeReviewCommentCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const MRole = _MRole.initModel(sequelize);
    const MUser = _MUser.initModel(sequelize);
    const RClassStudentGrade = _RClassStudentGrade.initModel(sequelize);
    const RClassUser = _RClassUser.initModel(sequelize);
    const TClass = _TClass.initModel(sequelize);
    const TClassStudent = _TClassStudent.initModel(sequelize);
    const TGradeComposition = _TGradeComposition.initModel(sequelize);
    const TGradeReview = _TGradeReview.initModel(sequelize);
    const TGradeReviewComment = _TGradeReviewComment.initModel(sequelize);

    MUser.belongsToMany(TClass, { as: 'idClassTClasses', through: RClassUser, foreignKey: "idUser", otherKey: "idClass" });
    TClass.belongsToMany(MUser, { as: 'idUserMUsers', through: RClassUser, foreignKey: "idClass", otherKey: "idUser" });
    MUser.belongsTo(MRole, { as: "idRoleMRole", foreignKey: "idRole"});
    MRole.hasMany(MUser, { as: "mUsers", foreignKey: "idRole"});
    MUser.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(MUser, { as: "mUsers", foreignKey: "createdUser"});
    MUser.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(MUser, { as: "lastUpdUserMUsers", foreignKey: "lastUpdUser"});
    RClassUser.belongsTo(MUser, { as: "idUserMUser", foreignKey: "idUser"});
    MUser.hasMany(RClassUser, { as: "rClassUsers", foreignKey: "idUser"});
    TClass.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(TClass, { as: "tClasses", foreignKey: "createdUser"});
    TClass.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(TClass, { as: "lastUpdUserTClasses", foreignKey: "lastUpdUser"});
    TGradeComposition.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(TGradeComposition, { as: "tGradeCompositions", foreignKey: "createdUser"});
    TGradeComposition.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(TGradeComposition, { as: "lastUpdUserTGradeCompositions", foreignKey: "lastUpdUser"});
    RClassStudentGrade.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(RClassStudentGrade, { as: "rClassStudentGrades", foreignKey: "idClass"});
    RClassUser.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(RClassUser, { as: "rClassUsers", foreignKey: "idClass"});
    TClassStudent.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(TClassStudent, { as: "tClassStudents", foreignKey: "idClass"});
    TGradeComposition.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(TGradeComposition, { as: "tGradeCompositions", foreignKey: "idClass"});
    RClassStudentGrade.belongsTo(TClassStudent, { as: "idClassStudentTClassStudent", foreignKey: "idClassStudent"});
    TClassStudent.hasMany(RClassStudentGrade, { as: "rClassStudentGrades", foreignKey: "idClassStudent"});
    RClassStudentGrade.belongsTo(TGradeComposition, { as: "idGradeCompositionTGradeComposition", foreignKey: "idGradeComposition"});
    TGradeComposition.hasMany(RClassStudentGrade, { as: "rClassStudentGrades", foreignKey: "idGradeComposition"});

    return {
        MRole: MRole,
        MUser: MUser,
        RClassStudentGrade: RClassStudentGrade,
        RClassUser: RClassUser,
        TClass: TClass,
        TClassStudent: TClassStudent,
        TGradeComposition: TGradeComposition,
        TGradeReview: TGradeReview,
        TGradeReviewComment: TGradeReviewComment,
    };
}
