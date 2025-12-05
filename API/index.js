import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import routes from './src/routes/index.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!'))

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`API listening at PORT: ${port}`)
})
