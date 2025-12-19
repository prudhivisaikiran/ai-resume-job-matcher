const { getOverviewAnalytics } = require('../services/analytics.service');

// @desc    Get recruiter-level analytics overview
// @route   GET /api/analytics/overview
// @access  Private
const getOverview = async (req, res) => {
    try {
        const { resumeId } = req.query;

        if (!resumeId) {
            return res.status(400).json({ message: 'Please provide resumeId query parameter' });
        }

        const analytics = await getOverviewAnalytics(req.user.id, resumeId);
        res.json(analytics);

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({
            message: 'Server error generating analytics',
            error: error.message
        });
    }
};

module.exports = {
    getOverview
};
