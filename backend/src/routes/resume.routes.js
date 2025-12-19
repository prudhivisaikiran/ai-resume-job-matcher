const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resume.controller');
const { protect } = require('../middleware/auth.middleware');

// Multer config for temporary storage
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('resume'), uploadResume);

module.exports = router;
