const User = require('../models/userModel'); // Import model User untuk akses ke database

// Fungsi untuk membuat user baru
exports.createUser = (req, res) => {
    const { username, email, password } = req.body;

    // Validasi input yang diperlukan
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // Membuat instance user baru berdasarkan model
    const newUser = new User({
        username,
        email,
        password // Ingat untuk mengenkripsi password di model sebelum menyimpannya
    });

    // Menyimpan user baru ke dalam database
    newUser.save()
        .then(user => {
            res.status(201).json(user); // Mengirimkan response sukses jika user berhasil dibuat
        })
        .catch(error => {
            res.status(400).json({ error: "Error creating user!" });
        });
};
