const express = require('express');
const router = express.Router();
const { initiatePayment, paymentCallback } = require('../controllers/paymentController');
const auth = require('../services/authMiddleware');

router.post('/mpesa', auth, initiatePayment);
router.post('/callback', paymentCallback);

module.exports = router;
