import DBConnector from "~/db/DBConnector";
import { initModels,  MUserCreationAttributes } from "~/models/init-models";
import { MUser} from "~/models/MUser"

export default class MUserDao {

    private static getDao() {
        return initModels(DBConnector.getInstance().getConnector()).MUser;
    }

    public static async create(obj: MUserCreationAttributes): Promise<void | MUser> {
        return await this.getDao().create(obj);
    }

    public static async update(username: string, email: string, fullname: string): Promise<void> {
        let now = new Date();

        await this.getDao().update(
            {email: email, fullname: fullname, lastUpdDate: now}, {
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
        return await this.getDao().findAll();
    }

    public static async findById(id: number): Promise<MUser | null> {
        return await this.getDao().findByPk(id)
    }
}

