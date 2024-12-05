  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const jwt = require('jsonwebtoken');
  const bodyParser = require('body-parser');

  const productRoutes = require('./backend/routes/productRoutes');
  const userRoutes = require('./backend/routes/userRoutes');

  const app = express();

  // Middleware untuk CORS
  app.use(bodyParser.json());
  app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Sesuaikan dengan URL frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  // Middleware untuk parsing JSON
  app.use(express.json());

  // Middleware untuk menyajikan file statis
  app.use(express.static(__dirname + '/views'));

  // Middleware validasi token JWT
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY || "FrontendForReShoesApp");
      req.user = decoded; // Menyimpan data user di request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };

  // Rute aman untuk profil
  app.get('/api/userRoutes/profile', verifyToken, (req, res) => {
    res.status(200).json({
      message: "Welcome to your profile!",
      user: req.user
    });
  });

  // Rute produk dan pengguna
  app.use('/api/products', productRoutes);
  app.use('/api/userRoutes', userRoutes);

  // Koneksi ke MongoDB
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

  // Menjalankan server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
