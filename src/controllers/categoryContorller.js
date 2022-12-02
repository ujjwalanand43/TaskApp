const mongoose  = require('mongoose')
const config = require('dotenv')
require('dotenv').config()

const CategorySchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    }

    
})

const Category = new mongoose.model('Category',CategorySchema)
module.exports = Category