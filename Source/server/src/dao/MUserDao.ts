import DBConnector from "~/db/DBConnector";
import { initModels,  MUserCreationAttributes } from "~/models/init-models";
import { MUser} from "~/models/MUser"

export default class MUserDao {

    private static getDao() {
        return initModels(DBConnector.getInstance().getConnector()).MUser;
    }

    public static async create(obj: MUserCreationAttributes): Promise<void> {
        await this.getDao().create(obj);
    }

    public static async update(username: string, email: string, fullname: string, studentId: string): Promise<void> {
        let now = new Date();

        await this.getDao().update(
            {email: email, fullname: fullname, studentId: studentId, lastUpdDate: now}, {
                where: {
                    username: username,
                }
            }
        )
    }

    public static async updateRefreshTokenAndExpiredDateById(id: number, refreshToken: string): Promise<void> {
        let now = new Date();
        now.setTime(now.getTime() + 5 * 60 * 1000);

        await this.getDao().update(
            {refreshToken: refreshToken, expiredRefreshToken: now}, {
                where: {
                    id: id,
                }
            }
        )
    }

    public static async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
        await this.getDao().update(
            {refreshToken: refreshToken}, {
                where: {
                    id: id,
                }
            }
        )
    }

    public static async logout(username: string): Promise<void> {
        await this.getDao().update(
            {refreshToken: null, expiredRefreshToken: null}, {
                where: {
                    username: username,
                }
            }
        )
    }

    public static async findByUsername(username: string): Promise<MUser | null> {
        return await this.getDao().findOne({
            where: {
                username: username,
            }
        });
    }

    public static async findByEmail(email: string): Promise<MUser | null> {
        return await this.getDao().findOne({
            where: {
                email: email,
            }
        });
    }

    public static async findAll(): Promise<MUser[]> {
        return await this.getDao().findAll({
            order: [
                ['id', 'ASC'],
            ]
        });
    }

    public static async findAllStudents(): Promise<MUser[]> {
        return await this.getDao().findAll({
            where: {
                idRole: 2,
            },
            order: [
                ['id', 'ASC'],
            ]
        });
    }

    public static async findStudentById(id: number): Promise<MUser | null> {
        return await this.getDao().findOne({
            where: {
                id: id,
                idRole: 2,
            }
        });
    }

    public static async findById(id: number): Promise<MUser | null> {
        return await this.getDao().findByPk(id);
    }

    public static async verifyEmail(id: number): Promise<void> {
        await this.getDao().update(
            {isVerifiedEmail: true}, {
                where: {
                    id: id,
                }
            }
        )
    }

    public static async updatePassword(id: number, passwordHash: string): Promise<void> {
        await this.getDao().update(
            {pwdHash: passwordHash}, {
                where: {
                    id: id,
                }
            }
        )
    }

    public static async lock(id: number): Promise<boolean> {
        const NOW = new Date();

        const IS_LOCK_SUCCESS = await this.getDao().update(
            {isActive: false, lastUpdDate: NOW, lastUpdUser: 1}, {
                where: {
                    id: id,
                }
            }
        )

        return IS_LOCK_SUCCESS[0] > 0;
    }

    public static async unlock(id: number): Promise<boolean> {
        const NOW = new Date();

        const IS_LOCK_SUCCESS = await this.getDao().update(
            {isActive: true, lastUpdDate: NOW, lastUpdUser: 1}, {
                where: {
                    id: id,
                }
            }
        )

        return IS_LOCK_SUCCESS[0] > 0;
    }

    public static async delete(id: number): Promise<boolean> {
        const IS_DELETE_SUCCESS = await this.getDao().destroy({
            where: {
                id: id,
            }
        });

        return IS_DELETE_SUCCESS > 0;
    }

    public static async updateStudentId(id: number, studentId: string): Promise<boolean> {
        const IS_UPDATE_SUCCESS = await this.getDao().update(
            {studentId: studentId}, {
                where: {
                    id: id,
                }
            }
        )

        return IS_UPDATE_SUCCESS[0] > 0;
    }
}

