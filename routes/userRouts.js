const express = require('express')
const router = express.Router()
 const userController = require('../controllers/userController')

router.get('/',userController.homePage)
router.get('/login',userController.loginPage)
router.post('/login',userController.userLogin)
router.get('/signUp',userController.signUpPage)
router.post('/signUp',userController.userSignUp)





module.exports = router