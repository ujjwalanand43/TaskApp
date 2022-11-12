const User = require('../models/user');
const bcrypt = require('bcrypt');
const { genSalt } = require('bcrypt');
const sendEmails = require('../middleware/nodemailer');


function userController() {

    return {
        async getCurrentUser(req,res){
            const user = await req.user

            res.status(200).send({
                data:user
            })
        },
          

        async postRegister(req, res) {

            const email = req.body.email;
            const password = req.body.password;
            const salt = await genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            
           
            const fileData = []
       
            if(req.file){
              fileData.push(req.file.filename)
            }
          
            
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: email,
                password: hashedPassword,
                // path:"/image/",
                
                profilePic : "/image/" + fileData
             
              
            })

         

            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({
                sucess: true,
                message: 'User Register Successfully',
                data: user,
                token
            })

            sendEmails(user.email, 'Welcome To Au', 'Create Your Own Task check It Read Do And Complete It')



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
                    message: 'Successfully logged in',
                    data: verifyEmail,
                    token

                })
            } catch (error) {
             
            }


        }


    }

}

module.exports = userController;