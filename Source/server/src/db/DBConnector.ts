import { Sequelize, Utils } from "sequelize";
import Util from "~/utils/Util";

export default class DBConnector {
    private static instance: DBConnector;
    private sequelize: Sequelize;

    private constructor() {
        this.sequelize = new Sequelize('ptudwnc', 'postgres', '123456?a', {
            host: 'localhost',
            dialect: 'postgres',
            
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            }
        });
    }

    public getConnector(): Sequelize {
        return this.sequelize;
    }

    public static getInstance(): DBConnector {
        if (Util.IsNullOrUndefined(this.instance)) {
            this.instance = new DBConnector();
        }

        return this.instance;
    }
}