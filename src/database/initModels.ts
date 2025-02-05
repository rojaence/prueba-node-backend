import type { Sequelize } from "sequelize";
import { User as _User, UserAttributes, UserScopes} from "@user/user.model";
import { Role as _Role, RoleAttributes } from "@role/role.model"
import { Permission as _Permission, PermissionAttributes } from "@role/permission.model"
import { RolePermission as _RolePermission, RolePermissionAttributes } from "@role/rolePermission.model";
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
  const RolePermission = _RolePermission.initModel(sequelize)
  const RoleUser = _RoleUser.initModel(sequelize)
  const LoginAttempt = _LoginAttempt.initModel(sequelize)
  const Session = _Session.initModel(sequelize)

  // Definiendo relacion entre tablas
  Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'idRole' })
  Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'idPermission' });

  Role.belongsToMany(User, { through: RoleUser, foreignKey: 'idRole' });
  User.belongsToMany(Role, { through: RoleUser, foreignKey: 'idUser', as: "roles" });

  LoginAttempt.belongsTo(User, { as: 'user', foreignKey: 'idUser' })
  User.hasMany(LoginAttempt, { as: 'loginAttempts', foreignKey: 'idUser' })

  Session.belongsTo(User, { as: 'user', foreignKey: 'idUser' })
  User.hasMany(Session, { as: 'sessions', foreignKey: 'idUser' })

  // Inicializar scopes
  User.addScope(UserScopes.UserProfile, {
    attributes: {
      exclude: ["password"]
    },
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        as: "roles",
        through: { attributes: [] }
      },
      {
        model: Session,
        as: 'sessions',
        attributes: ['id', 'startDate', 'endDate'],
        limit: 1, // Limitar a la última sesión
        order: [['startDate', 'DESC']]
      }
    ]
  })

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