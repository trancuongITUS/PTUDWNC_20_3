import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TGradeReviewCommentAttributes {
    id: number;
    idGradeReview?: number;
    idUser?: number;
    commentContent?: string;
}

export type TGradeReviewCommentPk = "id";
export type TGradeReviewCommentId = TGradeReviewComment[TGradeReviewCommentPk];
export type TGradeReviewCommentOptionalAttributes = "id" | "idGradeReview" | "idUser" | "commentContent";
export type TGradeReviewCommentCreationAttributes = Optional<TGradeReviewCommentAttributes, TGradeReviewCommentOptionalAttributes>;

export class TGradeReviewComment extends Model<TGradeReviewCommentAttributes, TGradeReviewCommentCreationAttributes> implements TGradeReviewCommentAttributes {
    id!: number;
    idGradeReview?: number;
    idUser?: number;
    commentContent?: string;


    static initModel(sequelize: Sequelize.Sequelize): typeof TGradeReviewComment {
        return sequelize.define('TGradeReviewComment', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idGradeReview: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_grade_review'
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'id_user'
        },
        commentContent: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'comment_content'
        }
    }, {
        tableName: 't_grade_review_comment',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "t_grade_review_comment_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof TGradeReviewComment;
    }
}
