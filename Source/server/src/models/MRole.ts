import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MUser, MUserId } from './MUser';

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

    // MRole hasMany MUser via idRole
    mUsers!: MUser[];
    getMUsers!: Sequelize.HasManyGetAssociationsMixin<MUser>;
    setMUsers!: Sequelize.HasManySetAssociationsMixin<MUser, MUserId>;
    addMUser!: Sequelize.HasManyAddAssociationMixin<MUser, MUserId>;
    addMUsers!: Sequelize.HasManyAddAssociationsMixin<MUser, MUserId>;
    createMUser!: Sequelize.HasManyCreateAssociationMixin<MUser>;
    removeMUser!: Sequelize.HasManyRemoveAssociationMixin<MUser, MUserId>;
    removeMUsers!: Sequelize.HasManyRemoveAssociationsMixin<MUser, MUserId>;
    hasMUser!: Sequelize.HasManyHasAssociationMixin<MUser, MUserId>;
    hasMUsers!: Sequelize.HasManyHasAssociationsMixin<MUser, MUserId>;
    countMUsers!: Sequelize.HasManyCountAssociationsMixin;

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
