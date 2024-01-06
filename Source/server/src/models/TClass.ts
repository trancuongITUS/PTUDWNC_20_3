import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MUser, MUserId } from './MUser';
import type { RClassStudentGrade, RClassStudentGradeId } from './RClassStudentGrade';
import type { RClassUser, RClassUserId } from './RClassUser';
import type { TGradeComposition, TGradeCompositionId } from './TGradeComposition';

export interface TClassAttributes {
    id: number;
    className: string;
    classDescription: string;
    gradeScale: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;
}

export type TClassPk = "id";
export type TClassId = TClass[TClassPk];
export type TClassOptionalAttributes = "id" | "recordVersion" | "createdDate" | "createdUser" | "lastUpdDate" | "lastUpdUser";
export type TClassCreationAttributes = Optional<TClassAttributes, TClassOptionalAttributes>;

export class TClass extends Model<TClassAttributes, TClassCreationAttributes> implements TClassAttributes {
    id!: number;
    className!: string;
    classDescription!: string;
    gradeScale!: number;
    recordVersion?: number;
    createdDate?: Date;
    createdUser?: number;
    lastUpdDate?: Date;
    lastUpdUser?: number;

    // TClass belongsTo MUser via createdUser
    createdUserMUser!: MUser;
    getCreatedUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setCreatedUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createCreatedUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // TClass belongsTo MUser via lastUpdUser
    lastUpdUserMUser!: MUser;
    getLastUpdUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setLastUpdUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createLastUpdUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // TClass belongsToMany MUser via idClass and idUser
    idUserMUsers!: MUser[];
    getIdUserMUsers!: Sequelize.BelongsToManyGetAssociationsMixin<MUser>;
    setIdUserMUsers!: Sequelize.BelongsToManySetAssociationsMixin<MUser, MUserId>;
    addIdUserMUser!: Sequelize.BelongsToManyAddAssociationMixin<MUser, MUserId>;
    addIdUserMUsers!: Sequelize.BelongsToManyAddAssociationsMixin<MUser, MUserId>;
    createIdUserMUser!: Sequelize.BelongsToManyCreateAssociationMixin<MUser>;
    removeIdUserMUser!: Sequelize.BelongsToManyRemoveAssociationMixin<MUser, MUserId>;
    removeIdUserMUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<MUser, MUserId>;
    hasIdUserMUser!: Sequelize.BelongsToManyHasAssociationMixin<MUser, MUserId>;
    hasIdUserMUsers!: Sequelize.BelongsToManyHasAssociationsMixin<MUser, MUserId>;
    countIdUserMUsers!: Sequelize.BelongsToManyCountAssociationsMixin;
    // TClass hasMany RClassStudentGrade via idClass
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
    // TClass hasMany RClassUser via idClass
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
    // TClass hasMany TGradeComposition via idClass
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

    static initModel(sequelize: Sequelize.Sequelize): typeof TClass {
        return sequelize.define('TClass', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        className: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'class_name'
        },
        classDescription: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'class_description'
        },
        gradeScale: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'grade_scale'
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
        tableName: 't_class',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "t_class_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof TClass;
    }
}
