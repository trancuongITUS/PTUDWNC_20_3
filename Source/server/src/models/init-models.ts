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
import { TGradeComposition as _TGradeComposition } from "./TGradeComposition";
import type { TGradeCompositionAttributes, TGradeCompositionCreationAttributes } from "./TGradeComposition";

export {
    _MRole as MRole,
    _MUser as MUser,
    _RClassStudentGrade as RClassStudentGrade,
    _RClassUser as RClassUser,
    _TClass as TClass,
    _TGradeComposition as TGradeComposition,
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
    TGradeCompositionAttributes,
    TGradeCompositionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const MRole = _MRole.initModel(sequelize);
    const MUser = _MUser.initModel(sequelize);
    const RClassStudentGrade = _RClassStudentGrade.initModel(sequelize);
    const RClassUser = _RClassUser.initModel(sequelize);
    const TClass = _TClass.initModel(sequelize);
    const TGradeComposition = _TGradeComposition.initModel(sequelize);

    MUser.belongsToMany(TClass, { as: 'idClassTClasses', through: RClassUser, foreignKey: "idUser", otherKey: "idClass" });
    TClass.belongsToMany(MUser, { as: 'idUserMUsers', through: RClassUser, foreignKey: "idClass", otherKey: "idUser" });
    MUser.belongsTo(MRole, { as: "idRoleMRole", foreignKey: "idRole"});
    MRole.hasMany(MUser, { as: "mUsers", foreignKey: "idRole"});
    MUser.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(MUser, { as: "mUsers", foreignKey: "createdUser"});
    MUser.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(MUser, { as: "lastUpdUserMUsers", foreignKey: "lastUpdUser"});
    RClassStudentGrade.belongsTo(MUser, { as: "idStudentMUser", foreignKey: "idStudent"});
    MUser.hasMany(RClassStudentGrade, { as: "rClassStudentGrades", foreignKey: "idStudent"});
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
    TGradeComposition.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(TGradeComposition, { as: "tGradeCompositions", foreignKey: "idClass"});
    RClassStudentGrade.belongsTo(TGradeComposition, { as: "idGradeCompositionTGradeComposition", foreignKey: "idGradeComposition"});
    TGradeComposition.hasMany(RClassStudentGrade, { as: "rClassStudentGrades", foreignKey: "idGradeComposition"});

    return {
        MRole: MRole,
        MUser: MUser,
        RClassStudentGrade: RClassStudentGrade,
        RClassUser: RClassUser,
        TClass: TClass,
        TGradeComposition: TGradeComposition,
    };
}
