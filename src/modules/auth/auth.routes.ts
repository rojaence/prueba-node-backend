import { Router, Response, Request, NextFunction } from "express";
import { GetProfileController, LoginController, UpdateProfileController } from "./auth.controller";
import { HttpResponse } from "@utils/httpResponse";
import { CodesHttpEnum } from "@enums/codesHttpEnums";
import { validate } from "express-validation";
import { loginValidation } from "./auth.validations";
import { jwtMiddleware } from "@middlewares/jwtMiddleware";

const routes = Router()

routes.post('/login', 
  validate(loginValidation, { keyByField: true }, {}) as any,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await LoginController(req)
    res.cookie('auth-token', response.data?.token, {
      httpOnly: true, // Asegura que la cookie solo se envíe a través de HTTP(S)
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: "strict",
      maxAge: 3600000, // 1 hora en milisegundos
    });
    res.status(response.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
    }
  }
})

routes.get('/profile',
  jwtMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await GetProfileController(req)
    res.status(response.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
    }
  }
})

routes.put('/profile',
  jwtMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UpdateProfileController(req)
    res.status(response.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
    }
  }
})





export default routes