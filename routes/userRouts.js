const express = require('express')
const router = express.Router()
const {verifyToken, checkToken, mustLogin} = require('../middleware/authMiddleware')
 const userController = require('../controllers/userController')

router.get('/', verifyToken,userController.homePage)
router.get('/login',checkToken, userController.loginPage)
router.post('/login', checkToken, userController.userLogin)
router.get('/signUp', checkToken, userController.signUpPage)
router.post('/signUp',checkToken, userController.userSignUp)
router.get('/profile', mustLogin, userController.profilePage)
router.post('/recipe', mustLogin, userController.userAddRecipe)
router.put('/recipe', mustLogin, userController.userUpdateRecipe)
router.get('/recipe/:userID', mustLogin, userController.userRecipe)







module.exports = router