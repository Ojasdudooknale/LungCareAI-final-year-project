const express = require('express');
const router = express.Router();
const { auth, isDoctor } = require('../middlewares/auth');
const { addPatient, editPatient, deletePatient, getAllPatients, getDoctorDetails } = require('../controllers/Doctor');
const AudioController = require('../controllers/Audio');

// Middleware to verify the doctor role
router.use(auth, isDoctor);

// Route to add a patient
router.post('/patients', addPatient);

// Route to edit a patient's details
router.put('/patients/:id', editPatient);

// Route to delete a patient
router.delete('/patients/:id', deletePatient);

// Route to fetch all patients under the doctor
router.get('/patients', getAllPatients);

// Route to fetch doctor details for the dashboard
router.get('/me', getDoctorDetails);  // Assuming `me` is the route for the current logged-in doctor


// Route for uploading an audio file and processing through Flask API
router.post('/patients/:id/upload-audio', AudioController.uploadAudio);

module.exports = router;
