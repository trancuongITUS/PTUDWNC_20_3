import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { TClass, TClassId } from './TClass';
import type { TClassStudent, TClassStudentId } from './TClassStudent';
import type { TGradeComposition, TGradeCompositionId } from './TGradeComposition';

export interface RClassStudentGradeAttributes {
    idClass: number;
    idClassStudent: number;
    idGradeComposition: number;
    grade?: number;
}

export type RClassStudentGradePk = "idClass" | "idClassStudent" | "idGradeComposition";
export type RClassStudentGradeId = RClassStudentGrade[RClassStudentGradePk];
export type RClassStudentGradeOptionalAttributes = "grade";
export type RClassStudentGradeCreationAttributes = Optional<RClassStudentGradeAttributes, RClassStudentGradeOptionalAttributes>;

export class RClassStudentGrade extends Model<RClassStudentGradeAttributes, RClassStudentGradeCreationAttributes> implements RClassStudentGradeAttributes {
    idClass!: number;
    idClassStudent!: number;
    idGradeComposition!: number;
    grade?: number;

    // RClassStudentGrade belongsTo TClass via idClass
    idClassTClass!: TClass;
    getIdClassTClass!: Sequelize.BelongsToGetAssociationMixin<TClass>;
    setIdClassTClass!: Sequelize.BelongsToSetAssociationMixin<TClass, TClassId>;
    createIdClassTClass!: Sequelize.BelongsToCreateAssociationMixin<TClass>;
    // RClassStudentGrade belongsTo TClassStudent via idClassStudent
    idClassStudentTClassStudent!: TClassStudent;
    getIdClassStudentTClassStudent!: Sequelize.BelongsToGetAssociationMixin<TClassStudent>;
    setIdClassStudentTClassStudent!: Sequelize.BelongsToSetAssociationMixin<TClassStudent, TClassStudentId>;
    createIdClassStudentTClassStudent!: Sequelize.BelongsToCreateAssociationMixin<TClassStudent>;
    // RClassStudentGrade belongsTo TGradeComposition via idGradeComposition
    idGradeCompositionTGradeComposition!: TGradeComposition;
    getIdGradeCompositionTGradeComposition!: Sequelize.BelongsToGetAssociationMixin<TGradeComposition>;
    setIdGradeCompositionTGradeComposition!: Sequelize.BelongsToSetAssociationMixin<TGradeComposition, TGradeCompositionId>;
    createIdGradeCompositionTGradeComposition!: Sequelize.BelongsToCreateAssociationMixin<TGradeComposition>;

    static initModel(sequelize: Sequelize.Sequelize): typeof RClassStudentGrade {
        return sequelize.define('RClassStudentGrade', {
        idClass: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 't_class',
                key: 'id'
            },
            field: 'id_class'
        },
        idClassStudent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 't_class_student',
                key: 'id'
            },
            field: 'id_class_student'
        },
        idGradeComposition: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 't_grade_composition',
                key: 'id'
            },
            field: 'id_grade_composition'
        },
        grade: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    }, {
        tableName: 'r_class_student_grade',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "r_class_student_grade_pkey",
                unique: true,
                fields: [
                    { name: "id_class" },
                    { name: "id_class_student" },
                    { name: "id_grade_composition" },
                ]
            },
        ]
    }) as typeof RClassStudentGrade;
    }
}
