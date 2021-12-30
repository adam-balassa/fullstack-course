const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const authenticationRouter = require('./controllers/authentication')
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)

const app = express()
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/auth', authenticationRouter)
app.use(errorHandler)

module.exports = app