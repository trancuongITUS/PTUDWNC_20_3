import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MUser, MUserId } from './MUser';
import type { RUserRole, RUserRoleId } from './RUserRole';

export interface MRoleAttributes {
    id: number;
    roleName?: string;
}

export type MRolePk = "id";
export type MRoleId = MRole[MRolePk];
export type MRoleOptionalAttributes = "id" | "roleName";
export type MRoleCreationAttributes = Optional<MRoleAttributes, MRoleOptionalAttributes>;

export class MRole extends Model<MRoleAttributes, MRoleCreationAttributes> implements MRoleAttributes {
    id!: number;
    roleName?: string;

    // MRole belongsToMany MUser via idRole and idUser
    idUserMUserRUserRoles!: MUser[];
    getIdUserMUserRUserRoles!: Sequelize.BelongsToManyGetAssociationsMixin<MUser>;
    setIdUserMUserRUserRoles!: Sequelize.BelongsToManySetAssociationsMixin<MUser, MUserId>;
    addIdUserMUserRUserRole!: Sequelize.BelongsToManyAddAssociationMixin<MUser, MUserId>;
    addIdUserMUserRUserRoles!: Sequelize.BelongsToManyAddAssociationsMixin<MUser, MUserId>;
    createIdUserMUserRUserRole!: Sequelize.BelongsToManyCreateAssociationMixin<MUser>;
    removeIdUserMUserRUserRole!: Sequelize.BelongsToManyRemoveAssociationMixin<MUser, MUserId>;
    removeIdUserMUserRUserRoles!: Sequelize.BelongsToManyRemoveAssociationsMixin<MUser, MUserId>;
    hasIdUserMUserRUserRole!: Sequelize.BelongsToManyHasAssociationMixin<MUser, MUserId>;
    hasIdUserMUserRUserRoles!: Sequelize.BelongsToManyHasAssociationsMixin<MUser, MUserId>;
    countIdUserMUserRUserRoles!: Sequelize.BelongsToManyCountAssociationsMixin;
    // MRole hasMany RUserRole via idRole
    rUserRoles!: RUserRole[];
    getRUserRoles!: Sequelize.HasManyGetAssociationsMixin<RUserRole>;
    setRUserRoles!: Sequelize.HasManySetAssociationsMixin<RUserRole, RUserRoleId>;
    addRUserRole!: Sequelize.HasManyAddAssociationMixin<RUserRole, RUserRoleId>;
    addRUserRoles!: Sequelize.HasManyAddAssociationsMixin<RUserRole, RUserRoleId>;
    createRUserRole!: Sequelize.HasManyCreateAssociationMixin<RUserRole>;
    removeRUserRole!: Sequelize.HasManyRemoveAssociationMixin<RUserRole, RUserRoleId>;
    removeRUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<RUserRole, RUserRoleId>;
    hasRUserRole!: Sequelize.HasManyHasAssociationMixin<RUserRole, RUserRoleId>;
    hasRUserRoles!: Sequelize.HasManyHasAssociationsMixin<RUserRole, RUserRoleId>;
    countRUserRoles!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof MRole {
        return sequelize.define('MRole', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'role_name'
        }
    }, {
        tableName: 'm_role',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "m_role_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof MRole;
    }
}
