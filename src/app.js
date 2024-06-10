import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

import setGlobalVars from './credentials.js'

import mparticleRouter from './routes/mparticle.js'
import klaviyoRouter from './routes/klaviyo.js'
import shopifyRouter from './routes/shopify.js'

app.use(setGlobalVars)

app.use('/', mparticleRouter)
app.use('/klaviyo', klaviyoRouter)
app.use('/shopify', shopifyRouter)

export default app
