const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config()
const { roles } = require('../middleware/roles')
const jwt = require('jsonwebtoken')
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,

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
    images: [{
        type: String
    }],

    subTask: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subtask'
    }]

}, {
    timestamps: true
})




const Task = new mongoose.model('Task', TaskSchema)
module.exports = Task