// models/Doctor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Doctor schema
const doctorSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user model 
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: false
    },
    hospital: {
        type: String,
        required: false
    },
    contactInfo: {
        type: String, // Can be an email or phone number
        required: false
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' // Array of references to the Patient model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
