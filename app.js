const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const bp = require('body-parser')
  
const database = config.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(database, {  dbName: `gameList`, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => logger.info("connected to MongoDB"))
    .catch((err) => logger.error("error connecting to MongoDB:", err))

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

const loginRouter = require("./routes/login")
const signupRouter = require("./routes/signup")
const gamesRouter = require("./routes/games")
const userRouter = require('./routes/user')

app.use("/api/login", loginRouter)
app.use("/api/signup", signupRouter)
app.use("/api/games", gamesRouter)
app.use("/api/user", userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app