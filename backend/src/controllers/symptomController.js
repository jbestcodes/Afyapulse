const axios = require('axios');
const Report = require('../models/Report');

exports.analyzeSymptoms = async (req, res) => {
  try {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    const { symptoms } = req.body;
    // Call Hugging Face Inference API
    const hfRes = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        inputs: symptoms,
        parameters: {
          candidate_labels: ["infection", "migraine", "flu", "cold", "allergy", "other"]
        }
      },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
    );
    // Extract top label from Hugging Face response
    const topLabel = hfRes.data && hfRes.data.labels && hfRes.data.labels[0] ? hfRes.data.labels[0] : null;
    const aiResult = topLabel || 'Possible conditions found.';

    // Simple first aid suggestions mapping
    const firstAidMap = {
      infection: 'Keep the area clean, rest, and see a doctor if symptoms worsen.',
      migraine: 'Rest in a quiet, dark room and take pain relief if needed.',
      flu: 'Rest, drink fluids, and manage fever with paracetamol.',
      cold: 'Rest, stay hydrated, and use saline drops for nasal congestion.',
      allergy: 'Avoid allergens and consider antihistamines.',
      other: 'Monitor symptoms and seek medical advice if they persist.'
    };
    const firstAid = aiResult && firstAidMap[aiResult] ? firstAidMap[aiResult] : 'Monitor symptoms and seek medical advice if they persist.';

    let reportData = { symptoms, aiResult };
    if (req.user && req.user.id) {
      reportData.user = req.user.id;
    }
    const report = new Report(reportData);
    await report.save();
    res.json({ reportId: report._id, aiResult, firstAid });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ message: 'AI analysis failed', error: err.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report || report.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching report' });
  }
};

exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

