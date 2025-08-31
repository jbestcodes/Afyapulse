const Report = require('../models/Report');
const { sendMpesaSTKPush, simulateMpesa } = require('../services/mpesaService');
const { sendNotification } = require('../services/instaSendService');

exports.initiatePayment = async (req, res) => {
  try {
    const { reportId, phone } = req.body;
    // Simulate or send M-Pesa STK push
    let paymentRes;
    if (process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET) {
      paymentRes = await sendMpesaSTKPush(phone);
    } else {
      paymentRes = await simulateMpesa(phone);
    }
    // Mark report as paid (simulate instant success)
    await Report.findByIdAndUpdate(reportId, { paid: true });
    // Send notification
    await sendNotification(phone, 'Your detailed report is ready.');
    res.json({ message: 'Payment successful, notification sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Payment failed', error: err.message });
  }
};

exports.paymentCallback = async (req, res) => {
  // For real M-Pesa integration, handle callback here
  res.json({ message: 'Callback received' });
};
