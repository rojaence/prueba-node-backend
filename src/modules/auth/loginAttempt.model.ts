import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type LoginAttemptAttributes = {
  id: number;
  idUser: number;
  resolved: boolean;
};

export type LoginAttemptCreateDTO = Optional<LoginAttemptAttributes, "id" | "resolved">

export class LoginAttempt extends Model<LoginAttemptAttributes, LoginAttemptCreateDTO> {
  declare id: number;
  declare idUser: number;
  declare resolved: boolean;

  static initModel(sequelize: Sequelize): typeof LoginAttempt {
    return sequelize.define('LoginAttempt', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      },
      resolved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    }, {
      tableName: 'loginAttempt',
      timestamps: true,
      indexes: [
        {
          name: "login_attempt_pk",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof LoginAttempt;
  }
}