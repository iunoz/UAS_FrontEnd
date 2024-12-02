// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./backend/routes/productRoutes');
const userRoutes = require('./backend/routes/userRoutes');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000', // Izinkan frontend Anda (port 3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Atur metode yang diizinkan
  credentials: true // Jika ada kebutuhan untuk mengirim cookies/credensial
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
