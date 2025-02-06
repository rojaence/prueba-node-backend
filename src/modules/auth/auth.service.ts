import { CodesHttpEnum } from "../../enums/codesHttpEnums";
import ApiException from "../../exceptions/ApiException";
import { UserCreateDTO, UserPasswordUpdateDTO, UserProfileUpdateDTO }  from "@user/user.model"
import { HttpResponse } from "../../utils/httpResponse";
import UserRepository from "@user/user.repository";
import AuthRepository from "@auth/auth.repository";
import { User } from "@database/initDatabase";
import BcryptHash from "@utils/bcryptHash";

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

  async updateProfileService(id: number, data: UserProfileUpdateDTO) {
    try {
      const existingUser = await this._userRepository.findById(id)
      const existingUsername = await this._userRepository.findByUsername(data.username)
      if (!existingUser) {
        return HttpResponse.response(CodesHttpEnum.notFound, null, 'Usuario no encontrado')
      }
      if (existingUsername && existingUsername.username === data.username && id !== existingUsername.id) {
        return HttpResponse.response(CodesHttpEnum.badRequest, null, 'El nombre de usuario ya existe')
      }

      const existingIdCard = await this._userRepository.findByIdCard(data.idCard)
      if (existingIdCard && existingIdCard.idCard === data.idCard && id !== existingIdCard.id) {
        return HttpResponse.response(
          CodesHttpEnum.badRequest,
          'Error al actualizar usuario',
          'Ya existe un usuario con la cédula proporcionada'
        )
      }

      const updatedUser = await this._authRepository.updateProfile(id, data)

      return HttpResponse.response(CodesHttpEnum.ok, updatedUser, 'Datos de perfil actualizados correctamente')
    } catch (error) {
      if (error instanceof ApiException) {
        return HttpResponse.response(error.statusCode, null, error.message)
      }
      throw new Error("Error en autenticación")
    }
  }

  async updatePasswordService(id: number, data: UserPasswordUpdateDTO) {
    try {
      const existingUser = await User.findByPk(id)
      if (!existingUser) {
        return HttpResponse.response(CodesHttpEnum.notFound, null, 'Usuario no encontrado')
      }

      const passwordChecked = await BcryptHash.chechPasswordHash(data.currentPassword, existingUser.password)
      if (!passwordChecked) {
        throw new ApiException('Credenciales incorrectas', CodesHttpEnum.unauthorized)
      }

      const response = await this._authRepository.updatePassword(id, data)
      return HttpResponse.response(CodesHttpEnum.ok, response, 'Contraseña actualizada correctamente')

    } catch (error) {
      if (error instanceof ApiException) {
        return HttpResponse.response(error.statusCode, 'Error al intenar actualizar contraseña', error.message)
      }
      console.log(error)
      throw new Error("Error en autenticación")
    }
  }
}