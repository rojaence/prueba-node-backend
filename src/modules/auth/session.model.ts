import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type SessionAttributes = {
  id: number;
  idUser: number;
  startDate: Date;
  endDate: Date;
};

export type SessionCreateDTO = Optional<SessionAttributes, "id" | "endDate">

export class Session extends Model<SessionAttributes, SessionCreateDTO> {
  declare id: number;
  declare idUser: number;
  declare startDate: Date;
  declare endDate: Date;

  static initModel(sequelize: Sequelize): typeof Session {
    return sequelize.define('Session', {
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'session',
      timestamps: false,
      indexes: [
        {
          name: "session_pk",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof Session;
  }
}