import { Sequelize, Utils } from 'sequelize'
import Util from '~/utils/Util'

export default class DBConnector {
  private static instance: DBConnector
  private sequelize: Sequelize

  private constructor() {
    this.sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
      host: 'postgres-aws.ch4eqas8ow8j.ap-southeast-1.rds.amazonaws.com',
      dialect: 'postgres',
      // native: false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  }

  public getConnector(): Sequelize {
    return this.sequelize
  }

  public static getInstance(): DBConnector {
    if (Util.isNullOrUndefined(this.instance)) {
      this.instance = new DBConnector()
    }

    return this.instance
  }
}
