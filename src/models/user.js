const mongoose = require('mongoose')
const { config } = require('dotenv')
require('dotenv').config()
const { roles } = require('../middleware/roles')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lasttname: {
        type: String,
    },
    email: {
        type: String,

        lowercase: true,
        unique: true,
    },
    password: {
        type: String,

    },
    profilePic: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: [roles.admin, roles.superadmin, roles.user],
        default: roles.user,
    },
  

    tokens: [{
        token: {
            type: String,
        }

    }]
}, {
    timestamps: true
})

// for creating a specific author task/notes/boards

UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.virtual('boards',{
   ref:'Board',
   localField:'_id',
    foreignField:'owner'
})




UserSchema.methods.generateAuthToken = async function(next) {
    const user = this
    try {
        const jwtToken = jwt.sign({

            
            _id: user._id.toString(),
            email: user.email,
            firstname:user.firstname

        }, process.env.TOKEN_SECRET, {
            expiresIn: '7 days'
        })

        user.tokens = user.tokens.concat({ token: jwtToken })
        await user.save()
        return jwtToken
    } catch (error) {
        console.log(err);
        res.send(err)
    }
}

const User = new mongoose.model('User', UserSchema)

module.exports = User