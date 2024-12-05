const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Sesuaikan dengan struktur model Anda
const router = express.Router();

const SECRET_KEY = "FrontendForReShoesApp"; // Secret key langsung di-hardcode untuk sementara

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
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login request received:", email);

        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ error: "User not found" });
        }

        // Cocokkan password langsung tanpa hashing
        if (password !== user.password) {
            console.log("Password mismatch for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
            expiresIn: "1h", // Token berlaku selama 1 jam
        });

        console.log("Login successful for:", email);
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Validasi Token
router.post('/auth/check', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifikasi token
        return res.status(200).json({ valid: true, userId: decoded.userId });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

router.get('/profile', (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        User.findById(decoded.userId, (err, user) => {
            if (err || !user) return res.status(404).json({ error: "User not found" });
            res.status(200).json({ username: user.username });
        });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});

router.put('/profile/username', (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        User.findByIdAndUpdate(decoded.userId, { username: req.body.username }, { new: true }, (err, user) => {
            if (err || !user) return res.status(404).json({ error: "User not found" });
            res.status(200).json({ username: user.username });
        });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});

router.put('/profile/password', (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        User.findByIdAndUpdate(decoded.userId, { password: req.body.password }, { new: true }, (err) => {
            if (err) return res.status(500).json({ error: "Failed to update password" });
            res.status(200).json({ message: "Password updated successfully" });
        });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});

router.delete('/profile', (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        User.findByIdAndDelete(decoded.userId, (err) => {
            if (err) return res.status(500).json({ error: "Failed to delete account" });
            res.status(200).json({ message: "Account deleted successfully" });
        });
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
});


module.exports = router;
