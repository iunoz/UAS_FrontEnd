const User = require('../models/User');
const bcrypt = require('bcrypt');

// Fungsi untuk registrasi user baru
exports.registerUser = async (req, res) => {
    const { nickname, email, password } = req.body;

    try {
        // Validasi input
        if (!nickname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Enkripsi password sebelum menyimpannya
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru
        const newUser = new User({ nickname, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
