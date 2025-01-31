import { Request } from "express";
import { UserService } from "./user.service";
import { UserPutDTO, UserCreateDTO, UserCreateWithRoleDTO } from "./user.model";


export const GetController = async (req: Request) => {
  try {
    const response = await new UserService().getUsers()
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const CreateController = async (req: Request) => {
  try {
    const createUserDTO = req.body as UserCreateWithRoleDTO
    const response = await new UserService().createUser(createUserDTO)
    return response
  } catch (error) {
    throw error
  }
}

export const GetByIdController = async (req: Request) => {
  try {
    const userId = parseInt(req.params.id)
    const response = await new UserService().getById(userId)
    return response
  } catch (error) {
    throw error
  }
}

export const PutController = async (req: Request) => {
  try {
    const userId = parseInt(req.params.id)
    const newUserData = req.body as UserPutDTO
    const response = await new UserService().putUser(userId, newUserData)
    return response
  } catch (error) {
    throw error
  }
}