const User = require('../models/User');
const Report = require('../models/Report');

exports.getUsageStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const reports = await Report.countDocuments();
    res.json({ users, reports });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const paidReports = await Report.find({ paid: true }).populate('user', 'name email');
    res.json(paidReports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};
