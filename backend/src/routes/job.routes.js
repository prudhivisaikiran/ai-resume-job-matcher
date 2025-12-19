const express = require('express');
const router = express.Router();
const { createJob, matchJobs, getMatchDetails, getJobs, improveResume } = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.get('/match', protect, matchJobs);
router.get('/:jobId/explain', protect, getMatchDetails);
router.get('/:jobId/improve', protect, improveResume);

module.exports = router;
