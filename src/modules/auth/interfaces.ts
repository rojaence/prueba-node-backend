import { JwtPayload } from "jsonwebtoken";

export interface ITokenDecoded extends JwtPayload {
  username: string,
  exp: number
}