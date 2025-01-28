import type { Sequelize } from "sequelize";
import { User as _User, UserAttributes} from "@user/user.model";
import { Role as _Role, RoleAttributes } from "@role/role.model"
import { Permission as _Permission, PermissionAttributes } from "@role/permission.model"
import { RolePermission as _RolePermisson, RolePermissionAttributes } from "@role/rolePermission.model";
import { RoleUser as _RoleUser, RoleUserAttributes } from "@role/roleUser.model";
import { LoginAttempt as _LoginAttempt, LoginAttemptAttributes } from "@auth/loginAttempt.model";
import { Session as _Session, SessionAttributes } from "@auth/session.model";  

export type {
  UserAttributes,
  RoleAttributes,
  PermissionAttributes,
  RolePermissionAttributes, 
  RoleUserAttributes,
  LoginAttemptAttributes,
  SessionAttributes
}

export function initModels(sequelize: Sequelize) {
  const User = _User.initModel(sequelize)
  const Role = _Role.initModel(sequelize)
  const Permission = _Permission.initModel(sequelize)
  const RolePermission = _RolePermisson.initModel(sequelize)
  const RoleUser = _RoleUser.initModel(sequelize)
  const LoginAttempt = _LoginAttempt.initModel(sequelize)
  const Session = _Session.initModel(sequelize)

  // Definiendo relacion entre tablas

  return {
    User,
    Role,
    Permission,
    RolePermission,
    RoleUser,
    LoginAttempt,
    Session
  }
}