import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export type RoleAttributes = {
  id: number,
  name: string,
}

export type RoleCreateDTO = Optional<RoleAttributes, "id">

export class Role extends Model<RoleAttributes, RoleCreateDTO> {
  declare id: number;
  declare name: string;

  static initModel(sequelize: Sequelize): typeof Role {
    return sequelize.define('Role', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {
      tableName: "role",
      indexes: [
        {
          name: "role_pk",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof Role
  }
}