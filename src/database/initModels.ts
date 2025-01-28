import type { Sequelize } from "sequelize";
import { User as _User, UserAttributes} from "@user/user.model";

export type {
  UserAttributes
}

export function initModels(sequelize: Sequelize) {
  const User = _User.initModel(sequelize)

  return {
    User
  }
}