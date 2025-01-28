import {  Request } from 'express'
import { ICredential } from '@user/interfaces'
import { AuthService } from './auth.service'

export const LoginController = async (req: Request) => {
  try {
    const { username, password } = req.body as ICredential
    const response = await new AuthService().loginService(username, password)
    return response
  } catch (error) {
    throw error
  }
}