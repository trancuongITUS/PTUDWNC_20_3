import type { Sequelize } from "sequelize";
import { MRole as _MRole } from "./MRole";
import type { MRoleAttributes, MRoleCreationAttributes } from "./MRole";
import { MUser as _MUser } from "./MUser";
import type { MUserAttributes, MUserCreationAttributes } from "./MUser";
import { RClassUser as _RClassUser } from "./RClassUser";
import type { RClassUserAttributes, RClassUserCreationAttributes } from "./RClassUser";
import { RUserRole as _RUserRole } from "./RUserRole";
import type { RUserRoleAttributes, RUserRoleCreationAttributes } from "./RUserRole";
import { TClass as _TClass } from "./TClass";
import type { TClassAttributes, TClassCreationAttributes } from "./TClass";

export {
    _MRole as MRole,
    _MUser as MUser,
    _RClassUser as RClassUser,
    _RUserRole as RUserRole,
    _TClass as TClass,
};

export type {
    MRoleAttributes,
    MRoleCreationAttributes,
    MUserAttributes,
    MUserCreationAttributes,
    RClassUserAttributes,
    RClassUserCreationAttributes,
    RUserRoleAttributes,
    RUserRoleCreationAttributes,
    TClassAttributes,
    TClassCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const MRole = _MRole.initModel(sequelize);
    const MUser = _MUser.initModel(sequelize);
    const RClassUser = _RClassUser.initModel(sequelize);
    const RUserRole = _RUserRole.initModel(sequelize);
    const TClass = _TClass.initModel(sequelize);

    MRole.belongsToMany(MUser, { as: 'idUserMUserRUserRoles', through: RUserRole, foreignKey: "idRole", otherKey: "idUser" });
    MUser.belongsToMany(MRole, { as: 'idRoleMRoles', through: RUserRole, foreignKey: "idUser", otherKey: "idRole" });
    MUser.belongsToMany(TClass, { as: 'idClassTClasses', through: RClassUser, foreignKey: "idUser", otherKey: "idClass" });
    TClass.belongsToMany(MUser, { as: 'idUserMUsers', through: RClassUser, foreignKey: "idClass", otherKey: "idUser" });
    RUserRole.belongsTo(MRole, { as: "idRoleMRole", foreignKey: "idRole"});
    MRole.hasMany(RUserRole, { as: "rUserRoles", foreignKey: "idRole"});
    MUser.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(MUser, { as: "mUsers", foreignKey: "createdUser"});
    MUser.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(MUser, { as: "lastUpdUserMUsers", foreignKey: "lastUpdUser"});
    RClassUser.belongsTo(MUser, { as: "idUserMUser", foreignKey: "idUser"});
    MUser.hasMany(RClassUser, { as: "rClassUsers", foreignKey: "idUser"});
    RUserRole.belongsTo(MUser, { as: "idUserMUser", foreignKey: "idUser"});
    MUser.hasMany(RUserRole, { as: "rUserRoles", foreignKey: "idUser"});
    TClass.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(TClass, { as: "tClasses", foreignKey: "createdUser"});
    TClass.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(TClass, { as: "lastUpdUserTClasses", foreignKey: "lastUpdUser"});
    RClassUser.belongsTo(TClass, { as: "idClassTClass", foreignKey: "idClass"});
    TClass.hasMany(RClassUser, { as: "rClassUsers", foreignKey: "idClass"});

    return {
        MRole: MRole,
        MUser: MUser,
        RClassUser: RClassUser,
        RUserRole: RUserRole,
        TClass: TClass,
    };
}
