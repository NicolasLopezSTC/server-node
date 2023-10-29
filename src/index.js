import './helpers/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import logger from './helpers/logger'
import router from './routes'
import { notFound, errorHandler } from './helpers/errors'

const port = Number(process.env.PORT)

const app = express()

app.use(morgan(process.env.MORGAN_LOG))
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(helmet())

app.use('/', router)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})