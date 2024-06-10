const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Recipe schema
const recipeSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    name: {
      type: String,
      required: false,
    },
    quantity: {
      type: String,
      required: false,
    }
  }],
  instructions: {
    type: String,
    required: false,
    trim: true
  },
  prepTime: {
    type: Number, 
    required: true
  },
  cookTime: {
    type: Number, 
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
 
  image: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
