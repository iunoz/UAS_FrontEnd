// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./frontend/app/routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

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
