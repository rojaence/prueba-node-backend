import { initModels } from "@database/initModels"
import { Sequelize } from "sequelize"
import db from "./dbOrm"

class Database {
  private static instance: Database
  public sequelize: Sequelize
  public models: ReturnType<typeof initModels>

  private constructor() {
    this.sequelize = db
    this.models = initModels(this.sequelize)
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

export const database = Database.getInstance()
export const { User, Role, Permission } = database.models