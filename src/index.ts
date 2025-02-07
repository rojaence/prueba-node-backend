import { database } from '@database/initDatabase'
import { PORT } from '@environment/env'
import express, { Response, Request, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import { ValidationError } from 'express-validation'
import { jwtMiddleware } from '@middlewares/jwtMiddleware'
import authRoutes from "@auth/auth.routes"
import roleRoutes from "@role/role.routes"
import cors from 'cors'
import userRoutes from '@user/user.routes'
import { HttpResponse } from '@utils/httpResponse'

const app = express()

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  optionsSuccessStatus: 200 // Para algunos navegadores antiguos
};

app.use(cors(corsOptions))
app.use(cookieParser())


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
app.use(`${prefix}/roles`, jwtMiddleware, roleRoutes)

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {

  if (res.headersSent) {
    return
  }

  if (err instanceof ValidationError) {
    const validation = HttpResponse.response(err.statusCode, err.details, err.message)
    return res.status(err.statusCode).json(validation)
  }

  return res.status(500).json(err)
} as any)

const port = Number(PORT)
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}`)
})