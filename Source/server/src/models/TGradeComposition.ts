import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MUser, MUserId } from './MUser';
import type { RClassStudentGrade, RClassStudentGradeId } from './RClassStudentGrade';
import type { TClass, TClassId } from './TClass';

export interface TGradeCompositionAttributes {
    id: number;
    idClass?: number;
    gradeName: string;
    gradeScale: number;
    gradePercent: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;
}

export type TGradeCompositionPk = "id";
export type TGradeCompositionId = TGradeComposition[TGradeCompositionPk];
export type TGradeCompositionOptionalAttributes = "id" | "idClass" | "gradeScale" | "recordVersion" | "createdDate" | "createdUser" | "lastUpdDate" | "lastUpdUser";
export type TGradeCompositionCreationAttributes = Optional<TGradeCompositionAttributes, TGradeCompositionOptionalAttributes>;

export class TGradeComposition extends Model<TGradeCompositionAttributes, TGradeCompositionCreationAttributes> implements TGradeCompositionAttributes {
    id!: number;
    idClass?: number;
    gradeName!: string;
    gradeScale!: number;
    gradePercent!: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;

    // TGradeComposition belongsTo MUser via createdUser
    createdUserMUser!: MUser;
    getCreatedUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setCreatedUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createCreatedUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // TGradeComposition belongsTo MUser via lastUpdUser
    lastUpdUserMUser!: MUser;
    getLastUpdUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setLastUpdUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createLastUpdUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // TGradeComposition belongsTo TClass via idClass
    idClassTClass!: TClass;
    getIdClassTClass!: Sequelize.BelongsToGetAssociationMixin<TClass>;
    setIdClassTClass!: Sequelize.BelongsToSetAssociationMixin<TClass, TClassId>;
    createIdClassTClass!: Sequelize.BelongsToCreateAssociationMixin<TClass>;
    // TGradeComposition hasMany RClassStudentGrade via idGradeComposition
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

    static initModel(sequelize: Sequelize.Sequelize): typeof TGradeComposition {
        return sequelize.define('TGradeComposition', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idClass: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 't_class',
                key: 'id'
            },
            field: 'id_class'
        },
        gradeName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'grade_name'
        },
        gradeScale: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 100,
            field: 'grade_scale'
        },
        gradePercent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'grade_percent'
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
        tableName: 't_grade_composition',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "t_grade_composition_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof TGradeComposition;
    }
}
