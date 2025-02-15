// models/HealthReport.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the HealthReport schema
const healthReportSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    audio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio', // Reference to the Audio model
        required: true
    },
    classificationResults: {
        type: Object, // Store classification results (e.g., disease name, confidence score)
        required: true
    },
    doctorNotes: {
        type: String, // Doctor’s comments or notes about the diagnosis
        required: false
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model who generated/reviewed the report
        required: true
    },
    comparisonWithPrevious: {
        type: String, // Optional field to store comparison details with previous results
        required: false
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema
const HealthReport = mongoose.model('HealthReport', healthReportSchema);

module.exports = HealthReport;
