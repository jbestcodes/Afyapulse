const express = require('express');
const router = express.Router();
const { getUsageStats, getPayments } = require('../controllers/adminController');
const auth = require('../services/authMiddleware');

router.get('/usage', auth, getUsageStats);
router.get('/payments', auth, getPayments);

module.exports = router;
