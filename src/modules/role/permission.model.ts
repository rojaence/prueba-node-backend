import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export type PermissionAttributes = {
  id: number,
  name: string,
}

export type PermissionCreateDTO = Optional<PermissionAttributes, "id">

export class Permission extends Model<PermissionAttributes, PermissionCreateDTO> {
  declare id: number;
  declare name: string;

  static initModel(sequelize: Sequelize): typeof Permission {
    return sequelize.define('Permission', {
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
      tableName: "permission",
      indexes: [
        {
          name: "permission_pk",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof Permission
  }
}