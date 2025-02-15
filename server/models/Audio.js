// models/Audio.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Audio schema for storing audio file data
const audioSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    fileUrl: {
        type: String, // URL of the audio file in Cloudinary or other storage
        required: true
    },
    fileType: {
        type: String, // Audio format (e.g., 'mp3', 'wav')
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number, // Duration of the audio in seconds
        required: true
    },
    processed: {
        type: Boolean, // Flag indicating whether the audio has been processed
        default: false
    }
});

// Create the model from the schema
const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
