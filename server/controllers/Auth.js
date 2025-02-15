const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { z } = require('zod');

// Signup validation schema
const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password should have at least 6 characters"),
    role: z.enum(['doctor', 'patient']).optional(),
});

// Login validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password is required"),
});

// **Signup Controller**
exports.signup = async (req, res) => {
    try {
        const validation = signupSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const validatedData = validation.data;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const role = validatedData.role || 'patient'; // Default to patient if not provided

        // Create the new user
        const newUser = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            password: hashedPassword,
            role,
        });

        // Save the new user
        await newUser.save();

        // Create corresponding role-based entry
        if (role === 'doctor') {
            const newDoctor = new Doctor({
                user: newUser._id,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                email: validatedData.email,
            });
            await newDoctor.save();
        } else if (role === 'patient') {
            const newPatient = new Patient({
                user: newUser._id,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                email: validatedData.email,
            });
            await newPatient.save();
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// **Login Controller**
exports.login = async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const validatedData = validation.data;

        // Find user by email
        const user = await User.findOne({ email: validatedData.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set the cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
        });
        //console.log(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// **Logout Controller**
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });

    res.status(200).json({ success: true, message: "Logout successful" });
};


exports.profile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Profile Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
