import { hash, compare } from "bcrypt"

export default class BcryptHash {
  static async genPasswordHash(password: string, saltRounds: number = 10): Promise<string> {
    const passwordHash = await hash(password, saltRounds)
    return passwordHash
  }

  static async chechPasswordHash(password: string, hash: string): Promise<boolean> {
    const checked = await compare(password, hash)
    return checked
  }
}