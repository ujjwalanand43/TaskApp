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
        type: String
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





UserSchema.methods.generateAuthToken = async function(next) {
    const user = this
    try {
        const jwtToken = jwt.sign({
            _id: user._id.toString(),
            // email: user.email,

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