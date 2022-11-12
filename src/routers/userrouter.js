const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const auth = require('../middleware/verify')
const userController = require('../controllers/userController')



router.post('/postregister', upload.single('profilePic'), userController().postRegister)
router.post('/postlogin', userController().postLogin)
router.get('/currentuser',auth,userController().getCurrentUser)


module.exports = router