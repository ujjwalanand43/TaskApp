const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config()
mongoose.connect(process.env.SCHEMA, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('Connection Successfull');
}).catch((e) => {
    console.log("No Connection", e);
})