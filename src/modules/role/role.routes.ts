import { Router, Response, Request, NextFunction } from "express";
import { HttpResponse } from "@utils/httpResponse";
import { CodesHttpEnum } from "@enums/codesHttpEnums";
import { GetController } from "./role.controller";

const routes = Router()

routes.get('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await GetController(req)
      res.status(response.code).json(response)
    } catch (error) {
      if (error instanceof Error) {
        HttpResponse.fail(res, CodesHttpEnum.internalServerError, error.message)
      }
    }
  }
)

export default routes;