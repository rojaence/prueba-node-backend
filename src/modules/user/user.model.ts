import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export type UserAttributes = {
  id: number,
  username: string,
  password: string,
  sessionActive: boolean,
  email: string,
  status: boolean,
  firstName: string,
  middleName: string,
  firstLastname: string,
  secondLastname: string,
  idCard: string,
  birthDate: Date
}

export type UserCreateDTO = Optional<UserAttributes, "id">

export enum UserScopes {
  UserProfile = "userProfile"
}

class User extends Model<UserAttributes, UserCreateDTO> {
  declare id: number;
  declare username: string;
  declare password: string;
  declare sessionActive: boolean;
  declare email: string;
  declare status: boolean;
  declare firstName: string;
  declare middleName: string;
  declare firstLastname: string;
  declare secondLastname: string;
  declare idCard: string;
  declare birthDate: Date;

  static initModel(sequelize: Sequelize): typeof User {
    return sequelize.define('User', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sessionActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstLastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secondLastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idCard: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 10]
        }
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      scopes: {
        [UserScopes.UserProfile]: {
          attributes: {
            exclude: ["password"]
          }
        }
      },
      tableName: "user",
      indexes: [
        {
          name: "user_pk",
          unique: true,
          fields: [
            { name: "id" }
          ]
        }
      ]
    }) as typeof User
  }
}


