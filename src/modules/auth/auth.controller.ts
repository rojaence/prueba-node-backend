import {  Request } from 'express'
import { ICredential } from '@user/interfaces'
import { AuthService } from './auth.service'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '@environment/env'
import { ITokenDecoded } from './interfaces'

export const LoginController = async (req: Request) => {
  try {
    const { username, password } = req.body as ICredential
    const response = await new AuthService().loginService(username, password)
    return response
  } catch (error) {
    throw error
  }
}

export const GetProfileController = async (req: Request) => {
  try {
    const token = req.cookies['auth-token']
    const decoded: ITokenDecoded = verify(token!, JWT_SECRET) as ITokenDecoded
    const response = await new AuthService().profileService(decoded.id)
    return response
  } catch (error) {
    throw error
  }
}