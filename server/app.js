const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const zumbiesRouter = require('./controllers/zumbies')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(bodyParser.json({ limit: "2mb"}));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/zumbies", zumbiesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app
