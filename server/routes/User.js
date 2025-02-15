const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/Auth');  // Import the signup and login controllers

const { auth } = require('../middlewares/auth');  // Import the auth middleware
// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', auth, logout);

//
// router.post('/upload-sound', auth, uploadAudio);

module.exports = router;
