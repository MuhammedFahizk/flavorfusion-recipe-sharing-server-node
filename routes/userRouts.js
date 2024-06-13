const express = require('express')
const router = express.Router()
const {authenticate, redirectToHomeIfAuthenticated} = require('../middleware/authMiddleware')
 const userController = require('../controllers/userController')

router.get('/', userController.homePage)
router.get('/login',redirectToHomeIfAuthenticated, userController.loginPage)
router.post('/login',redirectToHomeIfAuthenticated,  userController.userLogin)
router.get('/signUp',redirectToHomeIfAuthenticated,  userController.signUpPage)
router.post('/signUp',redirectToHomeIfAuthenticated, userController.userSignUp)
router.get('/profile',authenticate, userController.profilePage)
router.get('/logout', authenticate, userController.userLogout)


router.post('/recipe',authenticate, userController.userAddRecipe)
router.delete('/recipe/:recipeID',authenticate, userController.userDeleteRecipe)
router.put('/recipe',authenticate,  userController.userUpdateRecipe)
router.get('/recipes/:userID',authenticate, userController.userRecipe)
router.get('/recipes',  userController.recipes)
router.get('/recipe/:recipeId',  userController.selectedRecipe)











module.exports = router