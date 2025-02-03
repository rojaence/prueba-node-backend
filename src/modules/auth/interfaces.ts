import { JwtPayload } from "jsonwebtoken";

export interface ITokenDecoded extends JwtPayload {
  username: string,
  id: number,
  exp: number
}