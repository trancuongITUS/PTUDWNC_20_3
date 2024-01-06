import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MRole, MRoleId } from './MRole';
import type { RClassStudentGrade, RClassStudentGradeId } from './RClassStudentGrade';
import type { RClassUser, RClassUserId } from './RClassUser';
import type { TClass, TClassId } from './TClass';
import type { TGradeComposition, TGradeCompositionId } from './TGradeComposition';

export interface MUserAttributes {
    id: number;
    username: string;
    pwdHash?: string;
    email: string;
    fullname?: string;
    refreshToken?: string | null;
    expiredRefreshToken?: Date | null;
    isGoogle?: boolean;
    isVerifiedEmail?: boolean;
    codeVerifyEmail?: string;
    idRole?: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;
}

export type MUserPk = "id";
export type MUserId = MUser[MUserPk];
export type MUserOptionalAttributes = "id" | "pwdHash" | "fullname" | "refreshToken" | "expiredRefreshToken" | "isGoogle" | "isVerifiedEmail" | "codeVerifyEmail" | "idRole" | "recordVersion" | "createdDate" | "createdUser" | "lastUpdDate" | "lastUpdUser";
export type MUserCreationAttributes = Optional<MUserAttributes, MUserOptionalAttributes>;

export class MUser extends Model<MUserAttributes, MUserCreationAttributes> implements MUserAttributes {
    id!: number;
    username!: string;
    pwdHash?: string;
    email!: string;
    fullname?: string;
    refreshToken?: string | null;
    expiredRefreshToken?: Date | null;
    isGoogle?: boolean;
    isVerifiedEmail?: boolean;
    codeVerifyEmail?: string;
    idRole?: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;

    // MUser belongsTo MRole via idRole
    idRoleMRole!: MRole;
    getIdRoleMRole!: Sequelize.BelongsToGetAssociationMixin<MRole>;
    setIdRoleMRole!: Sequelize.BelongsToSetAssociationMixin<MRole, MRoleId>;
    createIdRoleMRole!: Sequelize.BelongsToCreateAssociationMixin<MRole>;
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
    // MUser hasMany RClassStudentGrade via idStudent
    rClassStudentGrades!: RClassStudentGrade[];
    getRClassStudentGrades!: Sequelize.HasManyGetAssociationsMixin<RClassStudentGrade>;
    setRClassStudentGrades!: Sequelize.HasManySetAssociationsMixin<RClassStudentGrade, RClassStudentGradeId>;
    addRClassStudentGrade!: Sequelize.HasManyAddAssociationMixin<RClassStudentGrade, RClassStudentGradeId>;
    addRClassStudentGrades!: Sequelize.HasManyAddAssociationsMixin<RClassStudentGrade, RClassStudentGradeId>;
    createRClassStudentGrade!: Sequelize.HasManyCreateAssociationMixin<RClassStudentGrade>;
    removeRClassStudentGrade!: Sequelize.HasManyRemoveAssociationMixin<RClassStudentGrade, RClassStudentGradeId>;
    removeRClassStudentGrades!: Sequelize.HasManyRemoveAssociationsMixin<RClassStudentGrade, RClassStudentGradeId>;
    hasRClassStudentGrade!: Sequelize.HasManyHasAssociationMixin<RClassStudentGrade, RClassStudentGradeId>;
    hasRClassStudentGrades!: Sequelize.HasManyHasAssociationsMixin<RClassStudentGrade, RClassStudentGradeId>;
    countRClassStudentGrades!: Sequelize.HasManyCountAssociationsMixin;
    // MUser hasMany RClassUser via idUser
    rClassUsers!: RClassUser[];
    getRClassUsers!: Sequelize.HasManyGetAssociationsMixin<RClassUser>;
    setRClassUsers!: Sequelize.HasManySetAssociationsMixin<RClassUser, RClassUserId>;
    addRClassUser!: Sequelize.HasManyAddAssociationMixin<RClassUser, RClassUserId>;
    addRClassUsers!: Sequelize.HasManyAddAssociationsMixin<RClassUser, RClassUserId>;
    createRClassUser!: Sequelize.HasManyCreateAssociationMixin<RClassUser>;
    removeRClassUser!: Sequelize.HasManyRemoveAssociationMixin<RClassUser, RClassUserId>;
    removeRClassUsers!: Sequelize.HasManyRemoveAssociationsMixin<RClassUser, RClassUserId>;
    hasRClassUser!: Sequelize.HasManyHasAssociationMixin<RClassUser, RClassUserId>;
    hasRClassUsers!: Sequelize.HasManyHasAssociationsMixin<RClassUser, RClassUserId>;
    countRClassUsers!: Sequelize.HasManyCountAssociationsMixin;
    // MUser belongsToMany TClass via idUser and idClass
    idClassTClasses!: TClass[];
    getIdClassTClasses!: Sequelize.BelongsToManyGetAssociationsMixin<TClass>;
    setIdClassTClasses!: Sequelize.BelongsToManySetAssociationsMixin<TClass, TClassId>;
    addIdClassTClass!: Sequelize.BelongsToManyAddAssociationMixin<TClass, TClassId>;
    addIdClassTClasses!: Sequelize.BelongsToManyAddAssociationsMixin<TClass, TClassId>;
    createIdClassTClass!: Sequelize.BelongsToManyCreateAssociationMixin<TClass>;
    removeIdClassTClass!: Sequelize.BelongsToManyRemoveAssociationMixin<TClass, TClassId>;
    removeIdClassTClasses!: Sequelize.BelongsToManyRemoveAssociationsMixin<TClass, TClassId>;
    hasIdClassTClass!: Sequelize.BelongsToManyHasAssociationMixin<TClass, TClassId>;
    hasIdClassTClasses!: Sequelize.BelongsToManyHasAssociationsMixin<TClass, TClassId>;
    countIdClassTClasses!: Sequelize.BelongsToManyCountAssociationsMixin;
    // MUser hasMany TClass via createdUser
    tClasses!: TClass[];
    getTClasses!: Sequelize.HasManyGetAssociationsMixin<TClass>;
    setTClasses!: Sequelize.HasManySetAssociationsMixin<TClass, TClassId>;
    addTClass!: Sequelize.HasManyAddAssociationMixin<TClass, TClassId>;
    addTClasses!: Sequelize.HasManyAddAssociationsMixin<TClass, TClassId>;
    createTClass!: Sequelize.HasManyCreateAssociationMixin<TClass>;
    removeTClass!: Sequelize.HasManyRemoveAssociationMixin<TClass, TClassId>;
    removeTClasses!: Sequelize.HasManyRemoveAssociationsMixin<TClass, TClassId>;
    hasTClass!: Sequelize.HasManyHasAssociationMixin<TClass, TClassId>;
    hasTClasses!: Sequelize.HasManyHasAssociationsMixin<TClass, TClassId>;
    countTClasses!: Sequelize.HasManyCountAssociationsMixin;
    // MUser hasMany TClass via lastUpdUser
    lastUpdUserTClasses!: TClass[];
    getLastUpdUserTClasses!: Sequelize.HasManyGetAssociationsMixin<TClass>;
    setLastUpdUserTClasses!: Sequelize.HasManySetAssociationsMixin<TClass, TClassId>;
    addLastUpdUserTClass!: Sequelize.HasManyAddAssociationMixin<TClass, TClassId>;
    addLastUpdUserTClasses!: Sequelize.HasManyAddAssociationsMixin<TClass, TClassId>;
    createLastUpdUserTClass!: Sequelize.HasManyCreateAssociationMixin<TClass>;
    removeLastUpdUserTClass!: Sequelize.HasManyRemoveAssociationMixin<TClass, TClassId>;
    removeLastUpdUserTClasses!: Sequelize.HasManyRemoveAssociationsMixin<TClass, TClassId>;
    hasLastUpdUserTClass!: Sequelize.HasManyHasAssociationMixin<TClass, TClassId>;
    hasLastUpdUserTClasses!: Sequelize.HasManyHasAssociationsMixin<TClass, TClassId>;
    countLastUpdUserTClasses!: Sequelize.HasManyCountAssociationsMixin;
    // MUser hasMany TGradeComposition via createdUser
    tGradeCompositions!: TGradeComposition[];
    getTGradeCompositions!: Sequelize.HasManyGetAssociationsMixin<TGradeComposition>;
    setTGradeCompositions!: Sequelize.HasManySetAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    addTGradeComposition!: Sequelize.HasManyAddAssociationMixin<TGradeComposition, TGradeCompositionId>;
    addTGradeCompositions!: Sequelize.HasManyAddAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    createTGradeComposition!: Sequelize.HasManyCreateAssociationMixin<TGradeComposition>;
    removeTGradeComposition!: Sequelize.HasManyRemoveAssociationMixin<TGradeComposition, TGradeCompositionId>;
    removeTGradeCompositions!: Sequelize.HasManyRemoveAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    hasTGradeComposition!: Sequelize.HasManyHasAssociationMixin<TGradeComposition, TGradeCompositionId>;
    hasTGradeCompositions!: Sequelize.HasManyHasAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    countTGradeCompositions!: Sequelize.HasManyCountAssociationsMixin;
    // MUser hasMany TGradeComposition via lastUpdUser
    lastUpdUserTGradeCompositions!: TGradeComposition[];
    getLastUpdUserTGradeCompositions!: Sequelize.HasManyGetAssociationsMixin<TGradeComposition>;
    setLastUpdUserTGradeCompositions!: Sequelize.HasManySetAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    addLastUpdUserTGradeComposition!: Sequelize.HasManyAddAssociationMixin<TGradeComposition, TGradeCompositionId>;
    addLastUpdUserTGradeCompositions!: Sequelize.HasManyAddAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    createLastUpdUserTGradeComposition!: Sequelize.HasManyCreateAssociationMixin<TGradeComposition>;
    removeLastUpdUserTGradeComposition!: Sequelize.HasManyRemoveAssociationMixin<TGradeComposition, TGradeCompositionId>;
    removeLastUpdUserTGradeCompositions!: Sequelize.HasManyRemoveAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    hasLastUpdUserTGradeComposition!: Sequelize.HasManyHasAssociationMixin<TGradeComposition, TGradeCompositionId>;
    hasLastUpdUserTGradeCompositions!: Sequelize.HasManyHasAssociationsMixin<TGradeComposition, TGradeCompositionId>;
    countLastUpdUserTGradeCompositions!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof MUser {
        return sequelize.define('MUser', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "m_user_username_key"
        },
        pwdHash: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
        expiredRefreshToken: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'expired_refresh_token'
        },
        isGoogle: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_google'
        },
        isVerifiedEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_verified_email'
        },
        codeVerifyEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'code_verify_email'
        },
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'm_role',
                key: 'id'
            },
            field: 'id_role'
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
