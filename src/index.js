import './helpers/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import pino from 'pino'



import logger from './helpers/logger'
import router from './routes'
import { notFound, errorHandler } from './helpers/errors'


const logger = pino({prettyPrint: { colorize: true}})

const port = parseInt(process.env.PORT, 10) ||3000

const app = express()

app.use(morgan(process.env.MORGAN_LOG))
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(helmet())

app.get('/', (req, res)=> {
  logger.info('Inside the root path')
  const title = process.env.TITLE || 'Server'
  res.send({ msg: title})
})


app.listen(port, () => 
  logger.info(`Application started at http://localhost:${process.env.PORT}`)
)