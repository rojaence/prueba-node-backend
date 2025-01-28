import { DataTypes, Model, Sequelize } from "sequelize";

export type RolePermissionAttributes = {
  idRole: number;
  idPermission: number;
};

export class RolePermission extends Model<RolePermissionAttributes> {
  declare idRole: number;
  declare idPermission: number;

  static initModel(sequelize: Sequelize): typeof RolePermission {
    return sequelize.define('RolePermission', {
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role', // Nombre de la tabla que contiene los roles
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idPermission: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Permission', // Nombre de la tabla que contiene los permisos
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    }, {
      tableName: 'RolePermission',
      timestamps: false,
      indexes: [
        {
          name: "role_permission_unique",
          unique: true,
          fields: [
            { name: "idRole" },
            { name: "idPermission" },
          ]
        }
      ]
    }) as typeof RolePermission;
  }
}