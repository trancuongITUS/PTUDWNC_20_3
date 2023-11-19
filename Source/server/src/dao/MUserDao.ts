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

    public static async updateRefreshTokenById(id: number, refreshToken: string): Promise<void> {
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
            {refreshToken: '', expiredDate: ''}, {
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
}

