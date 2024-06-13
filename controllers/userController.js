/* eslint-disable no-undef */
const User = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;

const jwt = require("jsonwebtoken");
const Recipe = require("../models/recipe");
const homePage = (req, res) => {
  if (req.user) {
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
console.log(password, user.password);

  if (user && (password ===  user.password)) {
   const accessToken = jwt.sign({user}, process.env.JWTSecretKey,{ expiresIn: '15s' })
   const refreshToken = jwt.sign({user}, process.env.JWTSecretKey,{ expiresIn: '1d' })

   res.cookie('refreshToken', refreshToken, {httpOnly : true, sameSite: 'strict'})
   .cookie('accessToken', accessToken)
   .status(200).json({message: 'Logged in successfully'})
   
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

    
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();
    const accessToken = jwt.sign({user: newUser}, process.env.JWTSecretKey,{ expiresIn: '15s' })
    const refreshToken = jwt.sign({user:newUser}, process.env.JWTSecretKey,{ expiresIn: '1d' })
 
    res.cookie('refreshToken', refreshToken, {httpOnly : true, sameSite: 'strict'})
    .cookie('accessToken', accessToken)
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


const userLogout = (req,res) => {
   const user = req.user
   if (!user) {
    return res.status(401).send("Unauthorized");
   } 
   res.clearCookie('refreshToken')
   .clearCookie('accessToken')
   .status(200).send("Logged out successfully")
}
const userAddRecipe = async (req, res) => {
  const userID = req.user._id;
  
  const { ...recipeDetails } = req.body;
  console.log("gfgh", recipeDetails);

  try {
    const newRecipe = new Recipe({
      userID,
      ...recipeDetails,
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error adding recipe:", error);
    if (error.name === "ValidationError") {
      // Extract the error message for instructions field
      // const errorMessage = error.errors.instructions.message;
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to add recipe" });
  }
};

const userUpdateRecipe = async (req, res) => {
  const { recipeId } = req.query;
  const { ...recipeDetails } = req.body;

  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }
 

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Update the recipe details with the provided data
    Object.assign(recipe, recipeDetails);

    const updatedRecipe = await recipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);

    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: errorMessages.join(", ") });
    }

    res.status(500).json({ error: `Failed to update recipe ${error}` });
  }
};

const userRecipe = async (req, res) => {
  try {
    const { userID } = req.params;
    
    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const recipes = await Recipe.find({ userID: new ObjectId(userID) });
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found for this user." });
    }
    res.status(200).json(recipes);
  } catch {

    res.status(500).json({ error: "Failed to update recipe" });
  }
};

const recipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch {
    res.status(500).json({ error: "Failed to get recipes" });
  }
};

const userDeleteRecipe = async (req, res) => {
  try {
    const { recipeID } = req.params;
    if (!recipeID) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }
    const result = await Recipe.deleteOne({ _id: recipeID });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};

const selectedRecipe = async(req,res) => {
try {
    const {recipeId} = req.params
    if (!recipeId) {
        return res.status(400).json({ error: "Recipe ID is required" });
        }
        const recipe = await Recipe.findById(recipeId)
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
            }
          return  res.status(200).json(recipe)

}catch (error)  {
    console.log(error);
    return res.status(500).json({error: 'internal server Error'})
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
  recipes,
  userDeleteRecipe,
  selectedRecipe,
  userLogout,
};
