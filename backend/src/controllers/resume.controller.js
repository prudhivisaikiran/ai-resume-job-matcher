const pdfParse = require('pdf-parse');
const fs = require('fs');
const Resume = require('../models/Resume');
const { getEmbedding } = require('../services/embeddings.service');

// @desc    Upload and parse resume
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let rawText = '';

        // Extract text based on file type
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(req.file.path);
            const data = await pdfParse(dataBuffer);
            rawText = data.text;
        } else if (req.file.mimetype === 'text/plain') {
            rawText = fs.readFileSync(req.file.path, 'utf8');
        } else {
            return res.status(400).json({ message: 'Unsupported file type. Use PDF or TXT.' });
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        if (!rawText.trim()) {
            return res.status(400).json({ message: 'Could not extract text from file' });
        }

        // Generate embedding
        const embedding = await getEmbedding(rawText);

        // Save to DB
        const resume = await Resume.create({
            userId: req.user.id,
            filename: req.file.originalname,
            rawText,
            embedding
        });

        // Log for verification
        console.log('--- Created Resume ---');
        console.log('ID:', resume._id);
        console.log('Filename:', resume.filename);

        res.status(201).json({
            message: 'Resume uploaded and processed successfully',
            resume: resume.toObject(),
            resumeId: resume._id.toString(),
            textPreview: rawText.substring(0, 200) + '...'
        });

    } catch (error) {
        console.error('!!! Resume Upload Error !!!');
        console.error(error);

        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Failed to unlink file after error:', unlinkError.message);
            }
        }

        res.status(500).json({
            message: 'Server error parsing resume',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

module.exports = { uploadResume };
