const Job = require('../models/Job');
const Resume = require('../models/Resume');
const { cosineSimilarity } = require('./embeddings.service');
const { explainMatch } = require('./matchExplain.service');

/**
 * Generates recruiter-grade analytics for a given resume across all user's jobs.
 */
const getOverviewAnalytics = async (userId, resumeId) => {
    // 1. Fetch Resume
    const resume = await Resume.findById(resumeId);
    if (!resume) throw new Error('Resume not found');
    if (resume.userId.toString() !== userId) throw new Error('Not authorized to access this resume');

    // 2. Fetch all jobs created by this user
    const jobs = await Job.find({ userId });
    if (jobs.length === 0) {
        return {
            totalJobs: 0,
            avgMatchScore: 0,
            bestMatchScore: 0,
            scoreBuckets: { "0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0 },
            topMissingSkills: []
        };
    }

    let totalScore = 0;
    let bestScore = 0;
    const scoreBuckets = { "0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0 };
    const missingSkillsMap = {};

    // 3. Process each job
    jobs.forEach(job => {
        // Calculate Match Score (Embedding Similarity)
        const sim = cosineSimilarity(resume.embedding, job.embedding);
        const score = Math.round(sim * 100);

        totalScore += score;
        if (score > bestScore) bestScore = score;

        // Categorize into buckets
        if (score <= 20) scoreBuckets["0-20"]++;
        else if (score <= 40) scoreBuckets["21-40"]++;
        else if (score <= 60) scoreBuckets["41-60"]++;
        else if (score <= 80) scoreBuckets["61-80"]++;
        else scoreBuckets["81-100"]++;

        // Gap Analysis (Keyword-based)
        const jobText = `${job.title} ${job.company} ${job.description}`;
        const matchData = explainMatch(resume.rawText, jobText);

        matchData.missingKeywords.forEach(skill => {
            missingSkillsMap[skill] = (missingSkillsMap[skill] || 0) + 1;
        });
    });

    // 4. Summarize skills
    const topMissingSkills = Object.entries(missingSkillsMap)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return {
        totalJobs: jobs.length,
        avgMatchScore: (totalScore / jobs.length).toFixed(1),
        bestMatchScore: bestScore,
        scoreBuckets,
        topMissingSkills
    };
};

module.exports = {
    getOverviewAnalytics
};
