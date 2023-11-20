import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MUserAttributes {
    id: number;
    username: string;
    pwdHash: string;
    email: string;
    fullname?: string | null;
    refreshToken?: string | null;
    expiredDate?: Date | null;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;
}

export type MUserPk = "id";
export type MUserId = MUser[MUserPk];
export type MUserOptionalAttributes = "id" | "fullname" | "refreshToken" | "expiredDate" | "recordVersion" | "createdDate" | "createdUser" | "lastUpdDate" | "lastUpdUser";
export type MUserCreationAttributes = Optional<MUserAttributes, MUserOptionalAttributes>;

export class MUser extends Model<MUserAttributes, MUserCreationAttributes> implements MUserAttributes {
    id!: number;
    username!: string;
    pwdHash!: string;
    email!: string;
    fullname?: string | null;
    refreshToken?: string | null;
    expiredDate?: Date | null;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;

    // MUser belongsTo MUser via createdUser
    createdUserMUser!: MUser;
    getCreatedUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setCreatedUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createCreatedUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // MUser belongsTo MUser via lastUpdUser
    lastUpdUserMUser!: MUser;
    getLastUpdUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setLastUpdUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createLastUpdUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;

    static initModel(sequelize: Sequelize.Sequelize): typeof MUser {
        return sequelize.define('MUser', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "m_user_username_key"
        },
        pwdHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'pwd_hash'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "m_user_email_key"
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'refresh_token'
        },
        expiredDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'expired_date'
        },
        recordVersion: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'record_version'
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'created_date'
        },
        createdUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_user',
                key: 'id'
            },
            field: 'created_user'
        },
        lastUpdDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_upd_date'
        },
        lastUpdUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_user',
                key: 'id'
            },
            field: 'last_upd_user'
        }
    }, {
        tableName: 'm_user',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "m_user_email_key",
                unique: true,
                fields: [
                    { name: "email" },
                ]
            },
            {
                name: "m_user_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "m_user_username_key",
                unique: true,
                fields: [
                    { name: "username" },
                ]
            },
        ]
    }) as typeof MUser;
    }
}
