const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verifikasi password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Jika login berhasil
        res.status(200).json({ message: 'Login successful!', nickname: user.nickname });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
    