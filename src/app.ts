import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import { router } from './router'

dotenv.config()
const app = express()

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors())
app.use(bodyParser.json())
app.use(router)

if (!process.env.MONGODB_URL)
  throw new Error('MONGODB_URL in not provided')

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
