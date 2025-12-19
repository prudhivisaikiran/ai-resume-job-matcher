const express = require('express');
const router = express.Router();
const { getOverview } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/overview', protect, getOverview);

module.exports = router;
