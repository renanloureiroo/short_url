import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { AppError } from './errors/AppError'
import { router } from './router'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: '*',
    exposedHeaders: 'x-total-count',
  })
)

app.use(router)
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: err.message,
      })
    }

    response.status(500).json({
      status: 'error',
      message: `Internal server error ${err.message}}`,
    })

    return next()
  }
)

app.get('/', (request: Request, response: Response) => {
  return response.send('OK')
})

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
)
