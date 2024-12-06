const mongoose = require('mongoose');

const ContactSupportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true, minlength: 50 },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSupportSchema);
