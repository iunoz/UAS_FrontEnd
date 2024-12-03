// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Model pengguna

// Registrasi pengguna
router.post('/register', async (req, res) => {
    // Log data yang diterima dari frontend
    console.log('Received data:', req.body);

    const { nickname, email, password } = req.body;

    try {
        // Validasi apakah pengguna sudah ada
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Membuat pengguna baru
        const user = new User({ nickname, email, password });
        await user.save();

        // Mengirim response berhasil
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
});

module.exports = router;
