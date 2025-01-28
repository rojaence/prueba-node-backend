import { CodesHttpEnum } from "@enums/codesHttpEnums"
import { JWT_SECRET } from "@environment/env"
import ApiException from "@exceptions/ApiException"
import UserRepository from "@user/user.repository"
import BcryptHash from "@utils/bcryptHash"
import { sign } from "jsonwebtoken"

export default class AuthRepository {
  private readonly _userRepository

  constructor() {
    this._userRepository = new UserRepository()
  }
  
  async loginUser(username: string, password: string)  {
    const userDB = await this._userRepository.findByUsername(username)
    if (!userDB) {
      throw new ApiException('El usuario no existe', CodesHttpEnum.notFound)
    }
    const passwordChecked = await BcryptHash.chechPasswordHash(password, userDB.password)

    if (!passwordChecked) {
      throw new ApiException('Credenciales incorrectas', CodesHttpEnum.unauthorized)
    }

    const token = sign({ id: userDB.id, username: userDB.username }, JWT_SECRET, {
      expiresIn: "1h"
    })
    return {
      username: userDB.username,
      token
    }
  }
}