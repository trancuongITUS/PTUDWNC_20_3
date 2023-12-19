import sequelize from "sequelize";
import DBConnector from "~/db/DBConnector";
import { initModels, MUser, TClass, TClassCreationAttributes } from "~/models/init-models";

export default class TClassDao {

    private static getDao() {
        return initModels(DBConnector.getInstance().getConnector()).TClass;
    }

    public static async create(obj: TClassCreationAttributes): Promise<void> {
        await this.getDao().create(obj);
    }

    public static async findAll(): Promise<TClass[]> {
        return await this.getDao().findAll();
    }

    public static async findById(id: number): Promise<TClass | null> {
        return await this.getDao().findByPk(id);
    }

    public static async findAllWithPaging(limit: number, offset: number): Promise<any> {
        return await this.getDao().findAndCountAll({
            offset: offset,
            limit: limit,
        });
    }
}