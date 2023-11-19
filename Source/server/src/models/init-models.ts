import type { Sequelize } from "sequelize";
import { MUser as _MUser } from "./MUser";
import type { MUserAttributes, MUserCreationAttributes } from "./MUser";

export {
    _MUser as MUser,
};

export type {
    MUserAttributes,
    MUserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const MUser = _MUser.initModel(sequelize);

    MUser.belongsTo(MUser, { as: "createdUserMUser", foreignKey: "createdUser"});
    MUser.hasMany(MUser, { as: "mUsers", foreignKey: "createdUser"});
    MUser.belongsTo(MUser, { as: "lastUpdUserMUser", foreignKey: "lastUpdUser"});
    MUser.hasMany(MUser, { as: "lastUpdUserMUsers", foreignKey: "lastUpdUser"});

    return {
        MUser: MUser,
    };
}
