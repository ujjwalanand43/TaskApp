const mongoose = require('mongoose')

const SubTaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,

    }


}, {
    timestamps: true
})



const SubTodo = new mongoose.model('subtask', SubTaskSchema)

module.exports = SubTodo