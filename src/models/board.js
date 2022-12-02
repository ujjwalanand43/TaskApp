const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config()
const { roles } = require('../middleware/roles')
const jwt = require('jsonwebtoken')
const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        lowercase: true,
        // unique: true,
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

    images: {
        type: String
    },

 

    // categories:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'Category'
    // }],

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

}, {
    timestamps: true
})




const Board = new mongoose.model('Board', BoardSchema)
module.exports = Board
