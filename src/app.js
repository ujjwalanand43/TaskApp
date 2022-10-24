const { config } = require('dotenv')
require('dotenv').config()
const express = require('express');
const app = express()
var cors = require('cors')
const bodyParser = require("body-parser");
require('./db/database');

var path = require('path');
var swagger_path =  path.resolve(__dirname,'./swagger.yaml');
console.log(swagger_path);

//using swagger for api docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(swagger_path);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const userRouter = require('./routers/userrouter')
const allRouter = require('./routers/allroutes')
const morgan = require('morgan')
// const path = require('path')
const User = require('./models/user')


app.use(cors());
app.options("*", cors());

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
}));






app.use('/api/v1/user', userRouter)
app.use('/api/v1/taskwise', allRouter)

app.use(morgan('dev'))


app.listen(process.env.PORT, () => {
    console.log('Listening to port 4000')
})