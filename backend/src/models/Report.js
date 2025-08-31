const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  symptoms: { type: String, required: true },
  aiResult: { type: String },
  detailedReport: { type: String },
  paid: { type: Boolean, default: false },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
