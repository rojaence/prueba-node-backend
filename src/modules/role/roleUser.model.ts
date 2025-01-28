import { DataTypes, Model, Sequelize } from "sequelize";

export type RoleUserAttributes = {
  idRole: number;
  idUser: number;
};

export class RoleUser extends Model<RoleUserAttributes> {
  declare idRole: number;
  declare idUser: number;

  static initModel(sequelize: Sequelize): typeof RoleUser {
    return sequelize.define('RoleUser', {
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    }, {
      tableName: 'RoleUser',
      timestamps: false,
      indexes: [
        {
          name: "role_user_unique",
          unique: true,
          fields: [
            { name: "idRole" },
            { name: "idUser" },
          ]
        }
      ]
    }) as typeof RoleUser;
  }
}