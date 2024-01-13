import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MUser, MUserId } from './MUser';
import type { TClass, TClassId } from './TClass';

export interface RClassUserAttributes {
    idClass: number;
    idUser: number;
    isOwner?: boolean;
    isStudentMapped?: boolean;
}

export type RClassUserPk = "idClass" | "idUser";
export type RClassUserId = RClassUser[RClassUserPk];
export type RClassUserOptionalAttributes = "isOwner" | "isStudentMapped";
export type RClassUserCreationAttributes = Optional<RClassUserAttributes, RClassUserOptionalAttributes>;

export class RClassUser extends Model<RClassUserAttributes, RClassUserCreationAttributes> implements RClassUserAttributes {
    idClass!: number;
    idUser!: number;
    isOwner?: boolean;
    isStudentMapped?: boolean;

    // RClassUser belongsTo MUser via idUser
    idUserMUser!: MUser;
    getIdUserMUser!: Sequelize.BelongsToGetAssociationMixin<MUser>;
    setIdUserMUser!: Sequelize.BelongsToSetAssociationMixin<MUser, MUserId>;
    createIdUserMUser!: Sequelize.BelongsToCreateAssociationMixin<MUser>;
    // RClassUser belongsTo TClass via idClass
    idClassTClass!: TClass;
    getIdClassTClass!: Sequelize.BelongsToGetAssociationMixin<TClass>;
    setIdClassTClass!: Sequelize.BelongsToSetAssociationMixin<TClass, TClassId>;
    createIdClassTClass!: Sequelize.BelongsToCreateAssociationMixin<TClass>;

    static initModel(sequelize: Sequelize.Sequelize): typeof RClassUser {
        return sequelize.define('RClassUser', {
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
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'm_user',
                key: 'id'
            },
            field: 'id_user'
        },
        isOwner: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_owner'
        },
        isStudentMapped: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'is_student_mapped'
        }
    }, {
        tableName: 'r_class_user',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "r_class_user_pkey",
                unique: true,
                fields: [
                    { name: "id_class" },
                    { name: "id_user" },
                ]
            },
        ]
    }) as typeof RClassUser;
    }
}
