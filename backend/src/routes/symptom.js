const express = require('express');
const router = express.Router();


const { analyzeSymptoms, getReport, getUserReports } = require('../controllers/symptomController');
const auth = require('../services/authMiddleware');

router.post('/analyze', analyzeSymptoms);
//router.post('/test', (req, res) => res.json({ ok: 'test' }));


router.get('/report/:id', auth, getReport);
router.get('/my', auth, getUserReports);

module.exports = router;
