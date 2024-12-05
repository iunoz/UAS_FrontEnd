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


module.exports = router;