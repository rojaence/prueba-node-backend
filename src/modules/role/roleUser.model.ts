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
          model: 'role',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    }, {
      tableName: 'roleUser',
      timestamps: false,
      // indexes: [
      //   {
      //     name: "role_user_unique",
      //     unique: true,
      //     fields: [
      //       { name: "idRole" },
      //       { name: "idUser" },
      //     ]
      //   }
      // ]
    }) as typeof RoleUser;
  }
}