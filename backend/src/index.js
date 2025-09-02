require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptom');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors({
  origin: ['https://afyapulse.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/symptom', symptomRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('=== AfyaPulse Backend STARTED ===');
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
