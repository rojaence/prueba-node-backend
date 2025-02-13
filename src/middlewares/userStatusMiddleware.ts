import { Request, Response, NextFunction } from 'express'
import { CodesHttpEnum } from '../enums/codesHttpEnums'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../environment/env'
import { HttpResponse } from '../utils/httpResponse'
import { ITokenDecoded } from '@auth/interfaces'
import { User } from '@database/initDatabase'

export const userStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    let token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      token = req.cookies['auth-token'];
    }

    if (!token) {
      res
        .status(CodesHttpEnum.unauthorized)
        .json(HttpResponse.fail(res, CodesHttpEnum.unauthorized, "Error de auth", "Se requiere autenticación"))
      return
    }
    const validated: ITokenDecoded = verify(token!, JWT_SECRET) as ITokenDecoded
    const user = await User.findByPk(validated.id)
    if (!user) {
      res
        .status(CodesHttpEnum.unauthorized)
        .json(HttpResponse.fail(res, CodesHttpEnum.unauthorized, "Error de auth", "Usuario no encontrado"))
      return
    }

    if (!user.status) {
      res
        .status(CodesHttpEnum.unauthorized)
        .json(HttpResponse.fail(res, CodesHttpEnum.unauthorized, "Error de auth", "Usted se encuentra bloqueado, comuníquese con un administrador"))
      return
    }
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res
        .status(CodesHttpEnum.unauthorized)
        .json(HttpResponse.response(CodesHttpEnum.unauthorized, "Error de auth", "La sesión ha expirado"))
    }
    if (error instanceof JsonWebTokenError) {
      res
        .status(CodesHttpEnum.unauthorized)
        .json(HttpResponse.response(CodesHttpEnum.unauthorized, "Error de auth", "Autenticación no válida"))
    }
  }
}