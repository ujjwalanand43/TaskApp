const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config()
const { roles } = require('../middleware/roles')
const jwt = require('jsonwebtoken')
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    assignee: {
        type: String,

    },
    important: {
        type: Boolean,
        default: false,
    },
    email: [{
        type: String,
    }],

    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Task'
    }],

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

}, {
    timestamps: true
})




const Category = new mongoose.model('Category', CategorySchema)
module.exports = Category