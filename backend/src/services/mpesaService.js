// Simulated M-Pesa STK push for demo/sandbox
exports.sendMpesaSTKPush = async (phone) => {
  // In real implementation, call M-Pesa API here
  return { success: true, message: 'STK push sent' };
};

exports.simulateMpesa = async (phone) => {
  // Simulate instant payment success
  return { success: true, message: 'Simulated payment success' };
};
