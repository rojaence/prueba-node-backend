import { config } from "dotenv"

config()

export const PORT = process.env.PORT ?? 3000
export const JWT_SECRET = process.env.JWT_SECRET!
export const MAX_LOGIN_ATTEMPTS = Number(process.env.MAX_LOGIN_ATTEMPTS)

export const DB_USER = process.env.DB_USER!
export const DB_PASS = process.env.DB_PASS!
export const DB_NAME = process.env.DB_NAME!
export const DB_HOST = process.env.DB_HOST!
export const DB_PORT = process.env.DB_PORT!
