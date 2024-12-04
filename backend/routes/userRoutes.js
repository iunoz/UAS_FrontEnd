const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint untuk registrasi user
router.post('/register', userController.registerUser);

module.exports = router;
