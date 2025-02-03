import { CodesHttpEnum } from "../../enums/codesHttpEnums";
import ApiException from "../../exceptions/ApiException";
import { UserCreateDTO }  from "@user/user.model"
import { HttpResponse } from "../../utils/httpResponse";
import UserRepository from "@user/user.repository";
import AuthRepository from "@auth/auth.repository";

export class AuthService {
  private readonly _authRepository: AuthRepository
  private readonly _userRepository: UserRepository

  constructor() {
    this._authRepository = new AuthRepository()
    this._userRepository = new UserRepository()
  }

  async loginService(username: string, password: string) {
    try {
      const response = await this._authRepository.loginUser(username, password)
      return HttpResponse.response(CodesHttpEnum.ok, response, 'Usuario logueado con éxito')
    } catch (error) {
      if (error instanceof ApiException) {
        return HttpResponse.response(error.statusCode, null, error.message)
      }
      console.log(error)
      throw new Error("Error en autenticación")
    }
  }

  async profileService(id: number) {
    try {
      const response = await this._userRepository.findById(id)
      return HttpResponse.response(CodesHttpEnum.ok, response, 'Perfil de usuario')
    } catch (error) {
      if (error instanceof ApiException) {
        return HttpResponse.response(error.statusCode, null, error.message)
      }
      console.log(error)
      throw new Error("Error en autenticación")
    }
  }
}