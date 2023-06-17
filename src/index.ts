import express, { json } from 'express'
import 'dotenv/config'

import router from './routes'

const app = express()

app.use(json())

app.use(router)

app.listen(3000, () => {
  console.log('app is running')
})
