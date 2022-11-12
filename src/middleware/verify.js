const { config } = require('dotenv')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
       
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
      
        const user = await User.findOne({ _id: decodedToken._id,'tokens.token': token })
    
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