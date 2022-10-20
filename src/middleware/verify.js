const jwt = require('jsonwebtoken');
const { config } = require('dotenv')
require('dotenv').config()
const User = require('../models/user');


const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        console.log(process.env.TOKEN_SECRET)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(decoded)
        const user = await User.findOne({ _id: decoded._id,'tokens.token': token })
        console.log(user)
        if (!user) {
            res.status(404).send('No user found');
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: 'Please Login/Signup to continue' })
    }
}

module.exports = auth