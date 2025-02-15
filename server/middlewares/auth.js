const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

dotenv.config();

// Middleware for authenticating the user (JWT token)
exports.auth = async (req, res, next) => {
    try {
        // Extracting JWT token from cookies, body or Authorization header
        // console.log('Request Headers:', req.headers);
        // console.log('Request Cookies:', req.cookies);
        // console.log('Request Body Token:', req.body.token);

        const token =
            req.cookies?.token ||
            req.body?.token ||
            req.headers['authorization']?.split(' ')[1];

        //console.log("token", token);

        // If token is missing, return Unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: "Token Missing" });
        }

        // Verifying the JWT token using the secret key
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded", decoded);
        // Storing decoded user info in the request object
        req.user = decoded;

        next();  // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is invalid" });
    }
};

// Middleware to check if the user is a Doctor
exports.isDoctor = async (req, res, next) => {
    try {
        // Find the user by the email in the JWT token
        const userDetails = await User.findById(req.user.id); // Assuming decoded token contains userId
        //  console.log("doctor details", userDetails);
        if (!userDetails || userDetails.role !== "doctor") {
            return res.status(401).json({
                success: false,
                message: "This route is for Doctors only",
            });
        }

        const doctor = await Doctor.findById(req.user.id);
        // console.log("Doctor ID:", req.user.id);  // Add this line for debugging

        // Find the doctor by the user ID
        const doctorDetails = await Doctor.findOne({ user: userDetails._id });
        // console.log("Doctor Details:", doctorDetails);  // Add this line for debugging
        if (!doctorDetails) {
            return res.status(401).json({
                success: false,
                message: "Doctor profile not found",
            });
        }

        // Attach doctor data to the request object
        req.doctor = doctorDetails;

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying Doctor role" });
    }
};

// Middleware to check if the user is a Patient
exports.isPatient = async (req, res, next) => {
    try {
        // Find the user by the email in the JWT token
        const userDetails = await User.findById(req.user.id);
        if (!userDetails || userDetails.role !== "patient") {
            return res.status(401).json({
                success: false,
                message: "This route is for Patients only",
            });
        }

        // Find the patient by the user ID
        const patientDetails = await Patient.findOne({ user: userDetails._id });
        if (!patientDetails) {
            return res.status(401).json({
                success: false,
                message: "Patient profile not found",
            });
        }

        // Attach patient data to the request object
        req.patient = patientDetails;

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying Patient role" });
    }
};
