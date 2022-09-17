const { config } = require('dotenv')
require('dotenv').config()
const express = require('express');
const app = express()
var cors = require('cors')
const bodyParser = require("body-parser");
require('./db/database')

const userRouter = require('./routers/userrouter')
const morgan = require('morgan')
const path = require('path')
const User = require('./models/user')


app.use(cors());
app.options("*", cors());

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
}));






app.use('/api/v1/user', userRouter)

app.use(morgan('dev'))


app.listen(process.env.PORT, () => {
    console.log('Listening to port 4000')
})