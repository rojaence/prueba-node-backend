import { database } from '@database/initDatabase'
import { PORT } from '@environment/env'
import express, { Response, Request, NextFunction } from 'express'
import { ValidationError } from 'express-validation'
import { jwtMiddleware } from '@middlewares/jwtMiddleware'
import authRoutes from "@auth/auth.routes"
import userRoutes from '@user/user.routes'

const app = express()

app.use(express.json())

async function initDBConn() {
  try {
    await database.sequelize.authenticate()
    await database.sequelize.sync({ alter: true })
  } catch (err) {
    console.error('Ocurrió un error al conectarse con la base de datos:', err);
  }
}

initDBConn()

const prefix = "/api"
app.use(`${prefix}/auth`, authRoutes)
app.use(`${prefix}/users`, jwtMiddleware, userRoutes)

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {

  if (res.headersSent) {
    return
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
} as any)

const port = Number(PORT)
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}`)
})