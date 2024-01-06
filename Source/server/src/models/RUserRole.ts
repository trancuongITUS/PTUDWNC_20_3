import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MRole, MRoleId } from './MRole';
import type { MUser, MUserId } from './MUser';

export interface RUserRoleAttributes {
    idUser: number;
    idRole: number;
}

export type RUserRolePk = "idUser" | "idRole";
export type RUserRoleId = RUserRole[RUserRolePk];
export type RUserRoleCreationAttributes = RUserRoleAttributes;

export class RUserRole extends Model<RUserRoleAttributes, RUserRoleCreationAttributes> implements RUserRoleAttributes {
    idUser!: number;
    idRole!: number;

    // RUserRole belongsTo MRole via idRole
    idRoleMRole!: MRole;
    getIdRoleMRole!: Sequelize.BelongsToGetAssociationMixin<MRole>;
    setIdRoleMRole!: Sequelize.BelongsToSetAssociationMixin<MRole, MRoleId>;
    createIdRoleMRole!: Sequelize.BelongsToCreateAssociationMixin<MRole>;
    // RUserRole belongsTo MUser via idUser
    idUserMUser!: MUser;
    getIdUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setIdUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createIdUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;

    static initModel(sequelize: Sequelize.Sequelize): typeof RUserRole {
        return sequelize.define('RUserRole', {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'm_user',
                key: 'id'
            },
            field: 'id_user'
        },
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'm_role',
                key: 'id'
            },
            field: 'id_role'
        }
    }, {
        tableName: 'r_user_role',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "r_user_role_pkey",
                unique: true,
                fields: [
                    { name: "id_user" },
                    { name: "id_role" },
                ]
            },
        ]
    }) as typeof RUserRole;
    }
}
