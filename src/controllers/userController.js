const User = require('../models/user');
const bcrypt = require('bcrypt');
const { genSalt } = require('bcrypt');
const sendEmails = require('../middleware/nodemailer');


function userController() {

    return {

        async postRegister(req, res) {

            const email = req.body.email;
            const password = req.body.password;
            const salt = await genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = new User({
                name: req.body.name,
                email: email,
                password: hashedPassword,
                // profilePic: "/image/" + req.file.filename
            })

            User.exists({ email: email }, (err, result) => {
                if (result) {
                    res.status(404).send({
                        message: "Some Error Occured"
                    })
                }
            })

            await user.save()
            res.status(201).send({
                sucess: true,
                message: "User Register Successfully",
                data: user
            })

            sendEmails(user.email)



        },

        async postLogin(req, res) {
            try {
                const { email, password } = req.body;
                const verifyEmail = await User.findOne({ email });
                if (!verifyEmail) {
                    res.status(404).send({
                        sucess: false,
                        message: 'Email dosent exist!! Please register '
                    });
                }
                const verifyPassword = await bcrypt.compare(password, verifyEmail.password)
                if (!verifyPassword) {
                    res.status(404).send({
                        sucess: false,
                        message: 'Email/password dosent match'
                    });
                }

                const token = await verifyEmail.generateAuthToken()



                res.status(200).send({
                    sucess: true,
                    message: "Successfully logged in",
                    data: verifyEmail,
                    token

                })
            } catch (error) {
                console.log(error);
            }


        }


    }

}

module.exports = userController;