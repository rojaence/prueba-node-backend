import { PORT } from '@environment/env'
import express, { Response, Request, NextFunction } from 'express'
import { ValidationError } from 'express-validation'

const app = express()

app.use(express.json())

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