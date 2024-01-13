import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TGradeReviewAttributes {
    id: number;
    idClass?: number;
    idClassStudent?: number;
    idGradeComposition?: number;
    reviewTitle?: string;
    currentGrade?: number;
    studentExpectationGrade?: number;
    updatedGrade?: number;
    studentExplanation?: string;
    isCompleted?: boolean;
}

export type TGradeReviewPk = "id";
export type TGradeReviewId = TGradeReview[TGradeReviewPk];
export type TGradeReviewOptionalAttributes = "id" | "idClass" | "idClassStudent" | "idGradeComposition" | "reviewTitle" | "currentGrade" | "studentExpectationGrade" | "updatedGrade" | "studentExplanation" | "isCompleted";
export type TGradeReviewCreationAttributes = Optional<TGradeReviewAttributes, TGradeReviewOptionalAttributes>;

export class TGradeReview extends Model<TGradeReviewAttributes, TGradeReviewCreationAttributes> implements TGradeReviewAttributes {
    id!: number;
    idClass?: number;
    idClassStudent?: number;
    idGradeComposition?: number;
    reviewTitle?: string;
    currentGrade?: number;
    studentExpectationGrade?: number;
    updatedGrade?: number;
    studentExplanation?: string;
    isCompleted?: boolean;


    static initModel(sequelize: Sequelize.Sequelize): typeof TGradeReview {
        return sequelize.define('TGradeReview', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idClass: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_class'
        },
        idClassStudent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_class_student'
        },
        idGradeComposition: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_grade_composition'
        },
        reviewTitle: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'review_title'
        },
        currentGrade: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'current_grade'
        },
        studentExpectationGrade: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'student_expectation_grade'
        },
        updatedGrade: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: 'updated_grade'
        },
        studentExplanation: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'student_explanation'
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_completed'
        }
    }, {
        tableName: 't_grade_review',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "t_grade_review_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof TGradeReview;
    }
}
