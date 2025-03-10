import { Role, User } from "@database/initDatabase";
import { CodesHttpEnum } from "@enums/codesHttpEnums";
import ApiException from "@exceptions/ApiException";
import { UserCreateDTO, UserCreateWithRoleDTO, UserPutDTO, UserScopes } from "./user.model";
import BcryptHash from "@utils/bcryptHash";

export default class UserRepository {
  async findByUsername(username: string) {
    return User.findOne({
      where: {
        username
      }
    })
  }

  async getUsers() {
    return User.scope(UserScopes.UserProfile).findAll()
  }

  async findById(id: number) {
    return User.scope(UserScopes.UserProfile).findOne({
      where: {
        id
      }
    })
  }

  async findByEmail(email: string) {
    return User.scope(UserScopes.UserProfile).findOne({
      where: {
        email
      }
    })
  }

  async findByIdCard(idCard: string) {
    return User.scope(UserScopes.UserProfile).findOne({
      where: {
        idCard
      }
    })
  }

  async createUser(payload: UserCreateWithRoleDTO) {
    const passwordHash = await BcryptHash.genPasswordHash(payload.password)
    const generatedEmail = await this.generateEmail(payload)
    payload.email = generatedEmail
    payload.password = passwordHash
    const user = await User.create(payload)
    const createdUser = User.scope(UserScopes.UserProfile).findByPk(user.id)
    return createdUser
  }

  async putUser(id: number, newData: UserPutDTO) {
    const user = await this.findById(id)
    if (!user) {
      throw new ApiException("No se encontró un usuario con el id proporcionado", CodesHttpEnum.notFound)
    }
    const { password, idRole, ...payload } = newData
    if (password) {
      const passwordHash = await BcryptHash.genPasswordHash(password)
      newData.password = passwordHash
      user.set(newData)
    } else {
      user.set(payload)
    }
    await user.save()
    const updatedUser = await User.scope(UserScopes.UserProfile).findByPk(user.id)
    return updatedUser
  }

  async generateEmail(user: UserCreateDTO) {
    let first = user.firstName[0].toLocaleLowerCase()
    let middle = user.firstLastname.toLocaleLowerCase() 
    let end = user.secondLastname[0].toLocaleLowerCase()
    let email = `${first}${middle}${end}@mail.com`
    let counter = 1
    let emailParts = email.split('@')
    let usernamePart = emailParts[0]
    let domainPart = emailParts[1]
    while (await User.findOne({
      where: {
        email
      }
    })) {
      email = `${usernamePart}${counter}@${domainPart}`
      counter += 1
    }
    return email
  }
}