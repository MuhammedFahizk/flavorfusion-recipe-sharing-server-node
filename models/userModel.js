const mongoose = require('mongoose');

// Define the user schema with additional validation and timestamps
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
