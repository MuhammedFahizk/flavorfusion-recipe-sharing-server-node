/* eslint-disable no-undef */
const User = require("../models/userModel");
const { ObjectId } = require('mongoose').Types;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Recipe = require('../models/recipe')
const homePage = (req, res) => {
    if(req.user) {
        res.status(200).json(req.user);
        return;
    }
    return res.status(200).send("home Page");
};

const loginPage = (req, res) => {
    res.status(200).send("Login Page");
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email, userId: user._id }, process.env.JWTSecretKey, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true 
        });
        res.status(200).send("Login Successful");
    } else {
        res.status(401).send("Invalid Credentials");
    }
};
const signUpPage = (req, res) => {
    res.status(200).send("Sign Up Page");
};

const userSignUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        console.log(name, email, password, confirmPassword);
        if (password !== confirmPassword) {
            return res.status(400).send("password does not match");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exist");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });

        await newUser.save();
        const token = jwt.sign({ email, userId: newUser._id }, process.env.JWTSecretKey, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true 
        });
        res.status(201).send("Successfully signed up");
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).send(messages.join(". "));
        }
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};
const profilePage = (req, res) => {
    const user = req.user;
    res.status(200).json(user);
};


const userAddRecipe = async (req, res) => {
    const userID = req.user.userId; 
    const { ...recipeDetails } = req.body;
    console.log('gfgh', recipeDetails);

    
    try {
        const newRecipe = new Recipe({
            userID,
            ...recipeDetails,
        });

        const savedRecipe = await newRecipe.save();

        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error('Error adding recipe:', error);
        if (error.name === 'ValidationError') {
            // Extract the error message for instructions field
            // const errorMessage = error.errors.instructions.message;
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to add recipe' });
    }
};


const userUpdateRecipe = async (req, res) => {
    const  {recipeId}  = req.query;
    const { ...recipeDetails } = req.body;

    if (!recipeId) {
        return res.status(400).json({ error: 'Recipe ID is required' });
    }
    console.log(recipeId);

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Update the recipe details with the provided data
       Object.assign(recipe, recipeDetails);



        const updatedRecipe = await recipe.save();
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error('Error updating recipe:', error);

        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }

        res.status(500).json({ error: 'Failed to update recipe' });
    }
};

const userRecipe =async  (req, res) => {
    try{
        const {userID} = req.params
        if( !userID) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const recipe = await Recipe.find({userID : new ObjectId(userID)});
        console.log(recipe);
        if (!recipe || recipe.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this user.' });
          }
        res.status(200).json(recipe.length)
    }
    catch  {
        res.status(500).json({ error: 'Failed to update recipe' });
    }

}

module.exports = {
    homePage,
    loginPage,
    userLogin,
    signUpPage,
    userSignUp,
    profilePage,
    userAddRecipe,
    userUpdateRecipe,
    userRecipe,
};
