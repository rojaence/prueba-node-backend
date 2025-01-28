import { CodesHttpEnum } from "../enums/codesHttpEnums";

export default class ApiException extends Error {
  statusCode: number
  constructor(message: string, code: CodesHttpEnum = CodesHttpEnum.internalServerError) {
    super(message);
    this.name = "ApiException";
    this.statusCode = code
  }
}