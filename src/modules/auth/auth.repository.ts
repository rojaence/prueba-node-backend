import { LoginAttempt, Session, User } from "@database/initDatabase"
import { CodesHttpEnum } from "@enums/codesHttpEnums"
import { JWT_SECRET, MAX_LOGIN_ATTEMPTS } from "@environment/env"
import ApiException from "@exceptions/ApiException"
import { UserProfileUpdateDTO, UserScopes } from "@user/user.model"
import UserRepository from "@user/user.repository"
import BcryptHash from "@utils/bcryptHash"
import { sign } from "jsonwebtoken"

export default class AuthRepository {
  private readonly _userRepository

  constructor() {
    this._userRepository = new UserRepository()
  }
  
  async loginUser(username: string, password: string)  {
    const user = await this._userRepository.findByUsername(username)
    if (!user) {
      throw new ApiException('El usuario no existe', CodesHttpEnum.notFound)
    }
    const passwordChecked = await BcryptHash.chechPasswordHash(password, user.password)

    const loginAttempts = await this.getLoginAttempts(user.id)
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      throw new ApiException('Intentos de inicio de sesión superados', CodesHttpEnum.badRequest)
    }

    if (!passwordChecked) {
      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.set({
          sessionActive: false,
          status: false
        })
        const lastSession = await this.getLastSession(user.id)
        if (!lastSession?.endDate) {
          lastSession?.set({
            endDate: new Date()
          })
          await lastSession?.save()
        }
        await user.save()
        throw new ApiException('Intentos de inicio de sesión superados', CodesHttpEnum.badRequest)
      }
      await this.saveLoginAttempt(user.id)
      throw new ApiException('Credenciales incorrectas', CodesHttpEnum.unauthorized)
    }

    const token = sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h"
    })

    const lastSession = await this.getLastSession(user.id)
    if (lastSession) {
      lastSession.set({
        endDate: new Date()
      })
      await lastSession.save()
    }
    await Session.create({
      idUser: user.id,
      startDate: new Date()
    })

    user.set({
      sessionActive: true
    });
    await user.save()
    return {
      username: user.username,
      token
    }
  }

  async saveLoginAttempt(idUser: number) {
    return await LoginAttempt.create({
      idUser
    })
  }

  async getLastSession(idUser: number) {
    return await Session.findOne({
      where: {
        idUser
      },
      order: [
        ['startDate', 'DESC']
      ]
    })
  }

  async getLoginAttempts(idUser: number) {
    return await LoginAttempt.count({
      where: {
        idUser,
        resolved: false
      }
    })
  }

  async findById(id: number) {
    return User.scope(UserScopes.UserProfile).findOne({
      where: {
        id
      }
    })
  }

  async updateProfile(id: number, data: UserProfileUpdateDTO) {
    const user = await this.findById(id)
    if (!user) {
      throw new ApiException("No se encontró un usuario con el id proporcionado", CodesHttpEnum.notFound)
    }
    user.set(data)
    await user.save()
    const updatedUser = await User.scope(UserScopes.UserProfile).findByPk(user.id)
    return updatedUser
  }
}