const express = require('express');
const User = require('../models/User');

const router = express.Router();

// CRUD Product

// Create a new product
// Create a new user
router.post('/users', async (req, res) => {
    const { username, nickname, email, password } = req.body;

    // Validasi data yang diterima
    if (!username || !nickname || !email || !password) {
        return res.status(400).json({ error: "All fields are required: username, nickname, email, password" });
    }

    try {
        const user = new User({ username, nickname, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Endpoint untuk login
router.post('/login', async (req, res) => {
    console.log("Login endpoint hit with data:", req.body);

    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        // Periksa password
        if (user.password !== password) {
            console.log("Invalid credentials");
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log("Login successful");
        res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username,
                nickname: user.nickname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

  
  module.exports = router;