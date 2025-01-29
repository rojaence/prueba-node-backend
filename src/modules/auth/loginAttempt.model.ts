import { DataTypes, Model, Sequelize } from "sequelize";

export type LoginAttemptAttributes = {
  id: number;
  idUser: number;
  resolved: boolean;
  dateAttempt: Date;
};

export class LoginAttempt extends Model<LoginAttemptAttributes> {
  declare id: number;
  declare idUser: number;
  declare resolved: boolean;
  declare createdAt: Date;

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
      dateAttempt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'loginAttempt',
      timestamps: false,
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