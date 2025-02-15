const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Add a new patient
exports.addPatient = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, medicalHistory, currentMedications, symptoms, email, password } = req.body;
        const doctor = req.doctor; // Attached by isDoctor middleware

        // Validate required fields
        if (!firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "First name, last name, email, and password are required",
            });
        }

        // Create the user (doctor or patient)
        const newUser = new User({
            firstName,
            lastName,
            email: email,
            password: password,
            role: "patient",  // This role should be patient for the added user
        });

        // Hash the password and save the user (optional if you're hashing passwords)
        const savedUser = await newUser.save();

        // Create the patient document linked to the user
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            medicalHistory,
            currentMedications,
            symptoms,
            user: savedUser._id,  // Link the patient to the user
            doctor: doctor._id,   // Link the patient to the doctor
        });

        await newPatient.save();

        // Add the patient to the doctor's list
        doctor.patients.push(newPatient._id);
        await doctor.save();

        res.status(201).json({
            success: true,
            message: "Patient added successfully",
            patient: newPatient,
        });
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({
            success: false,
            message: "Error adding patient",
        });
    }
};

// Edit an existing patient's details
exports.editPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, dateOfBirth, gender, medicalHistory, currentMedications, symptoms } = req.body;


        // Update the Patient document
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            { dateOfBirth, gender, medicalHistory, currentMedications, symptoms },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient details updated successfully",
            patient: updatedPatient,
        });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({
            success: false,
            message: "Error updating patient",
        });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the Patient document
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        // Remove the patient from the doctor's list
        const doctor = req.doctor; // Attached by isDoctor middleware
        doctor.patients = doctor.patients.filter(
            (patientId) => patientId.toString() !== id
        );
        await doctor.save();

        // Also, delete the linked user account
        await User.findByIdAndDelete(deletedPatient.user);

        res.status(200).json({
            success: true,
            message: "Patient and their account deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting patient",
        });
    }
};

// Fetch all patients under the doctor
exports.getAllPatients = async (req, res) => {
    try {
        const doctor = req.doctor; // Attached by isDoctor middleware

        // Find all patients linked to the doctor
        const patients = await Patient.find({ doctor: doctor._id });

        if (!patients || patients.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No patients found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patients fetched successfully",
            patients,
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching patients",
        });
    }
};


// Get doctor details
exports.getDoctorDetails = async (req, res) => {
    try {
        const doctor = req.doctor;  // Doctor info attached by the middleware (isDoctor)

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor details fetched successfully",
            doctor: {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                email: doctor.email,
                specialization: doctor.specialization,  // Assuming you have this field in the Doctor model
                patients: doctor.patients.length,  // You can add more details as needed
                createdAt: doctor.createdAt,
            },
        });
    } catch (error) {
        console.error("Error fetching doctor details:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching doctor details",
        });
    }
};
