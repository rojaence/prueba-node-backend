import { NextFunction, Request, Response, Router } from "express";
import { CodesHttpEnum } from "@enums/codesHttpEnums";
import { HttpResponse } from "@utils/httpResponse";
import { CreateController, GetByIdController, GetController, PutController } from "./user.controller";
import { createValidation, idParamValidation, putValidation } from "./user.validations";
import { validate } from "express-validation";

const routes = Router()

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await GetController(req)
    res.status(response.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
    }
  }
})

routes.post('/', 
  validate(createValidation, { keyByField: true }, {}) as any,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CreateController(req)
    res.status(response.code).json(response)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
    }
  }
})

routes.get('/:id', 
  validate(idParamValidation, { keyByField: true }, {}) as any,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await GetByIdController(req)
      res.status(response.code).json(response)
    } catch (error) {
      if (error instanceof Error) {
        HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
      }
    }
  }
)

routes.put('/:id',
  validate(putValidation, { keyByField: true }, {}) as any,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await PutController(req)
      res.status(response.code).json(response)
    } catch (error) {
      if (error instanceof Error) {
        HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
      }
    }
  }
)

export default routes