const express = require('express');
const ContactSupport = require('../models/ContactSupport'); // Import model

const router = express.Router();

// Rute untuk menerima pesan dari Contact Support
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validasi input
    if (!name || !email || !message || message.length < 50) {
      return res.status(400).json({ message: 'Invalid input.' });
    }

    // Simpan data ke database
    const contact = new ContactSupport({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Contact support message saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error });
  }
});

module.exports = router;
