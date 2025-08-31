const axios = require('axios');

exports.sendNotification = async (phone, message) => {
  // InstaSend API integration
  try {
    await axios.post('https://api.instasend.io/v1/messages', {
      to: phone,
      message,
      sender_id: process.env.INSTASEND_SENDER_ID
    }, {
      headers: { 'Authorization': `Bearer ${process.env.INSTASEND_API_KEY}` }
    });
    return true;
  } catch (err) {
    return false;
  }
};
