// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
