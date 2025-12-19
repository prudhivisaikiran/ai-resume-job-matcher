const Job = require('../models/Job');
const Resume = require('../models/Resume');
const { getEmbedding, cosineSimilarity } = require('../services/embeddings.service');
const { explainMatch, generateImprovements } = require('../services/matchExplain.service');

// @desc    Get all jobs for current user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
    try {
        const { title, company, description } = req.body;

        if (!title || !company || !description) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Create embedding from Title + Description for better context
        const textToEmbed = `${title} at ${company}. ${description}`;
        const embedding = await getEmbedding(textToEmbed);

        const job = await Job.create({
            userId: req.user.id,
            title,
            company,
            description,
            embedding
        });

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating job', error: error.message });
    }
};

// @desc    Match resume against jobs
// @route   GET /api/jobs/match
// @access  Private
const matchJobs = async (req, res) => {
    try {
        const { resumeId } = req.query;

        if (!resumeId) {
            return res.status(400).json({ message: 'Please provide resumeId' });
        }

        // 1. Fetch Resume
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // 2. Check ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this resume' });
        }

        // 2. Fetch all jobs (or filter by user if specific requirements)
        // Checks all jobs created by the current user (recruiter perspective)
        const jobs = await Job.find({ userId: req.user.id });

        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found to match against' });
        }

        // 3. Compute Similarity
        const results = jobs.map(job => {
            const score = cosineSimilarity(resume.embedding, job.embedding);
            return {
                job,
                matchScore: (score * 100).toFixed(2) // Percentage
            };
        });

        // 4. Sort by highest score
        results.sort((a, b) => b.matchScore - a.matchScore);

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error matching jobs', error: error.message });
    }
};

// @desc    Get match explanation
// @route   GET /api/jobs/:jobId/explain
// @access  Private
const getMatchDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { resumeId } = req.query;

        if (!resumeId) {
            return res.status(400).json({ message: 'Please provide resumeId query parameter' });
        }

        // 1. Fetch Job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check ownership (optional, but good practice)
        if (job.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this job' });
        }

        // 2. Fetch Resume
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this resume' });
        }

        // 3. Explain Logic
        // Combine Job fields for better keyword extraction
        const jobText = `${job.title} ${job.company} ${job.description}`;
        const explanation = explainMatch(resume.rawText, jobText);

        res.json({
            jobId: job._id,
            resumeId: resume._id,
            ...explanation
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating explanation', error: error.message });
    }
};

// @desc    Get resume improvement suggestions
// @route   GET /api/jobs/:jobId/improve
// @access  Private
const improveResume = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { resumeId } = req.query;

        if (!resumeId) {
            return res.status(400).json({ message: 'Please provide resumeId query parameter' });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const jobText = `${job.title} ${job.company} ${job.description}`;
        const improvements = generateImprovements(resume.rawText, jobText);

        res.json(improvements);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating improvements', error: error.message });
    }
};

module.exports = { createJob, matchJobs, getMatchDetails, getJobs, improveResume };
