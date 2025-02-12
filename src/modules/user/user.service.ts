import { CodesHttpEnum } from "@enums/codesHttpEnums"
import UserRepository from "./user.repository"
import { HttpResponse } from "@utils/httpResponse"
import { UserCreateWithRoleDTO, UserPutDTO, UserScopes } from "./user.model"
import { Role, RoleUser, User } from "@database/initDatabase"
import ApiException from "@exceptions/ApiException"
import { RoleUserAttributes } from "@role/roleUser.model"

export class UserService {
  private readonly _userRepository: UserRepository
  constructor() {
    this._userRepository = new UserRepository()
  }

  async getUsers() {
    let users = await this._userRepository.getUsers()
    return HttpResponse.response(CodesHttpEnum.ok, users)
  }

  async getById(id: number) {
    const existingUser = await this._userRepository.findById(id)
    if (!existingUser) {
      return HttpResponse.response(CodesHttpEnum.notFound, null, 'Usuario no encontrado')
    }
    return HttpResponse.response(CodesHttpEnum.ok, existingUser)
  }

  
  async createUser(data: UserCreateWithRoleDTO) {
    const role = await Role.findOne({
      where: {
        id: data.idRole
      }
    })
    if (!role) {
      return HttpResponse.response(CodesHttpEnum.badRequest, 'Error al crear usuario', 'No existe el rol proporcionado')
    }
    const existingUser = await this._userRepository.findByUsername(data.username)
    if (existingUser) {
      return HttpResponse.response(CodesHttpEnum.badRequest, 'Error al crear usuario', 'El usuario ya existe')
    }

    const existingIdCard = await this._userRepository.findByIdCard(data.idCard)
    if (existingIdCard) {
      return HttpResponse.response(
        CodesHttpEnum.badRequest,
        'Error al crear usuario',
        'Ya existe un usuario con la cédula proporcionada'
      )
    }

    const newUser = await this._userRepository.createUser(data)

    // Guardar el UserRole
    const userRole: RoleUserAttributes = {
      idRole: role.id,
      idUser: newUser!.id
    }
    await RoleUser.create(userRole)

    const userData = await User.scope(UserScopes.UserProfile).findByPk(newUser!.id)

    return HttpResponse.response(CodesHttpEnum.created, userData, 'Usuario creado con éxito')
  }

  async putUser(id: number, data: UserPutDTO) {
    const role = await Role.findOne({
      where: {
        id: data.idRole
      }
    })
    if (!role) {
      return HttpResponse.response(CodesHttpEnum.badRequest, 'Error al crear usuario', 'No existe el rol proporcionado')
    }

    const existingUser = await this._userRepository.findById(id)
    const existingUsername = await this._userRepository.findByUsername(data.username)
    if (!existingUser) {
      return HttpResponse.response(CodesHttpEnum.notFound, null, 'Usuario no encontrado')
    }
    if (existingUsername && existingUsername.username === data.username && id !== existingUsername.id) {
      return HttpResponse.response(CodesHttpEnum.badRequest, null, 'El nombre de usuario ya existe')
    }

    const existingEmail = await this._userRepository.findByEmail(data.email)
    if (existingEmail && existingEmail.email === data.email && id !== existingEmail.id) {
      return HttpResponse.response(CodesHttpEnum.badRequest, null, 'El email proporcionado ya se encuentra registrado')
    }

    const existingIdCard = await this._userRepository.findByIdCard(data.idCard)
    if (existingIdCard && existingIdCard.idCard === data.idCard && id !== existingIdCard.id) {
      return HttpResponse.response(
        CodesHttpEnum.badRequest,
        'Error al actualizar usuario',
        'Ya existe un usuario con la cédula proporcionada'
      )
    }

    // Actualizando el rol
    const userRole = await RoleUser.findOne({
      where: {
        idUser: id
      }
    })

    const updatedUser = await this._userRepository.putUser(id, data)
    
    RoleUser.update({
      idRole: data.idRole,      
    }, {
      where: {
        idRole: userRole?.idRole,
        idUser: userRole?.idUser
      }
    })

    const userData = await User.scope(UserScopes.UserProfile).findByPk(updatedUser!.id)
    return HttpResponse.response(CodesHttpEnum.ok, userData, 'Usuario actualizado con éxito')
  }
}