// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Google OAuth callback route
router.get('/google/callback', authController.googleCallbackHandler);

module.exports = router;
