import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RClassStudentGrade, RClassStudentGradeId } from './RClassStudentGrade';
import type { TClass, TClassId } from './TClass';

export interface TClassStudentAttributes {
    id: number;
    idClass?: number;
    studentId?: string;
    fullname?: string;
    isMapped?: boolean;
    idUserMapped?: number;
}

export type TClassStudentPk = "id";
export type TClassStudentId = TClassStudent[TClassStudentPk];
export type TClassStudentOptionalAttributes = "id" | "idClass" | "studentId" | "fullname" | "isMapped" | "idUserMapped";
export type TClassStudentCreationAttributes = Optional<TClassStudentAttributes, TClassStudentOptionalAttributes>;

export class TClassStudent extends Model<TClassStudentAttributes, TClassStudentCreationAttributes> implements TClassStudentAttributes {
    id!: number;
    idClass?: number;
    studentId?: string;
    fullname?: string;
    isMapped?: boolean;
    idUserMapped?: number;

    // TClassStudent belongsTo TClass via idClass
    idClassTClass!: TClass;
    getIdClassTClass!: Sequelize.BelongsToGetAssociationMixin<TClass>;
    setIdClassTClass!: Sequelize.BelongsToSetAssociationMixin<TClass, TClassId>;
    createIdClassTClass!: Sequelize.BelongsToCreateAssociationMixin<TClass>;
    // TClassStudent hasMany RClassStudentGrade via idClassStudent
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

    static initModel(sequelize: Sequelize.Sequelize): typeof TClassStudent {
        return sequelize.define('TClassStudent', {
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
        studentId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'student_id'
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isMapped: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_mapped'
        },
        idUserMapped: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_user_mapped'
        }
    }, {
        tableName: 't_class_student',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "t_class_student_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof TClassStudent;
    }
}
