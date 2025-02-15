// models/Patient.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Patient schema, referencing the User model
const patientSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for authentication details
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
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model (optional)
        default: null
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Predefined gender options
        required: false
    },
    medicalHistory: {
        type: String, // e.g., chronic diseases, past surgeries, allergies
        required: false
    },
    currentMedications: {
        type: [String], // Array of current medications the patient is on
        required: false
    },
    symptoms: {
        type: [String], // Array of current symptoms the patient is experiencing
        required: false
    },
    contactInfo: {
        type: String, // E.g., phone number or emergency contact
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
