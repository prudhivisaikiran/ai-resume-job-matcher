// Common tech keywords to prioritize (boost)
const TECH_KEYWORDS = new Set([
    'react', 'node', 'nodejs', 'express', 'mongodb', 'sql', 'nosql', 'aws', 'docker', 'kubernetes', 'k8s',
    'python', 'java', 'javascript', 'typescript', 'html', 'css', 'redux', 'api', 'rest', 'graphql',
    'git', 'ci/cd', 'agile', 'scrum', 'backend', 'frontend', 'fullstack', 'devops', 'cloud', 'azure',
    'gcp', 'firebase', 'postgresql', 'mysql', 'redis', 'jest', 'mocha', 'chai', 'cypress', 'selenium',
    'pandas', 'numpy', 'pytorch', 'tensorflow', 'keras', 'django', 'flask', 'spring', 'boot', 'hibernate',
    'maven', 'gradle', 'jenkins', 'gitlab', 'github', 'bitbucket', 'jira', 'confluence', 'linux', 'bash',
    'shell', 'scripting', 'algorithms', 'structures', 'design', 'patterns', 'microservices', 'serverless',
    'lambda', 'ec2', 's3', 'rds', 'dynamodb', 'auth', 'oauth', 'jwt', 'security', 'performance', 'scaling'
]);

const STOP_WORDS = new Set([
    'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'if', 'then',
    'else', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will',
    'just', 'should', 'now', 'looking', 'seeking', 'experience', 'knowledge', 'skills', 'ability', 'work',
    'years', 'proficient', 'understanding', 'familiarity', 'strong', 'excellent', 'good'
]);

const normalizeText = (text) => {
    if (!text) return '';
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
        .replace(/\s+/g, ' ')     // Collapse whitespace
        .trim();
};

const extractKeywords = (text) => {
    const normalized = normalizeText(text);
    const tokens = normalized.split(' ');
    const keywords = new Map(); // word -> count

    tokens.forEach(token => {
        if (token.length < 2) return;
        if (STOP_WORDS.has(token)) return;
        if (!isNaN(token)) return; // Skip numbers

        const count = keywords.get(token) || 0;
        keywords.set(token, count + 1);
    });

    return keywords;
};

const explainMatch = (resumeText, jobText) => {
    // 1. Extract tokens
    const resumeKeywords = extractKeywords(resumeText);
    const jobKeywords = extractKeywords(jobText);

    // 2. Identify Important Job Keywords (Prioritize Tech Stack)
    const sortedJobKeywords = Array.from(jobKeywords.entries())
        .sort((a, b) => {
            // Priority: Tech Keyword > Frequency
            const isTechA = TECH_KEYWORDS.has(a[0]);
            const isTechB = TECH_KEYWORDS.has(b[0]);
            if (isTechA && !isTechB) return -1;
            if (!isTechA && isTechB) return 1;
            return b[1] - a[1];
        })
        .map(entry => entry[0]);

    // Take top 30 for scoring to avoid noise
    const topJobKeywords = sortedJobKeywords.slice(0, 30);

    // 3. Find Matches and Gaps
    const matched = [];
    const missing = [];

    topJobKeywords.forEach(keyword => {
        if (resumeKeywords.has(keyword)) {
            matched.push(keyword);
        } else {
            missing.push(keyword);
        }
    });

    // 4. Calculate Score
    // Rule: matchScore = min(100, round( (matchedCount / max(1, jobKeywordCount)) * 100 ))
    // We add a small boost if tech keywords are matched to make it more realistic
    let score = 0;
    if (topJobKeywords.length > 0) {
        score = Math.round((matched.length / topJobKeywords.length) * 100);
    }

    // Cap at 100
    score = Math.min(100, Math.max(0, score));

    // 5. Generate Summary
    const summary = [];

    if (score >= 80) {
        summary.push("Excellent match! The candidate has strong coverage of the required skills.");
    } else if (score >= 50) {
        summary.push("Good match. The candidate meets many core requirements.");
    } else {
        summary.push("Fair match. There are some significant skill gaps.");
    }

    if (matched.length > 0) {
        const topMatches = matched.slice(0, 3).join(', ');
        summary.push(`Matches key requirements like: ${topMatches}.`);
    }

    if (missing.length > 0) {
        const topMissing = missing.slice(0, 3).join(', ');
        summary.push(`Consider probing for experience in: ${topMissing}.`);
    }

    return {
        score,
        matchedSkills: matched.slice(0, 10),
        missingSkills: missing.slice(0, 10),
        explanation: summary.join(' '),
        improvements: missing.slice(0, 5).map(kw => `Demonstrate experience in ${kw} to improve alignment.`)
    };
};

const generateImprovements = (resumeText, jobText) => {
    const analysis = explainMatch(resumeText, jobText);
    const { missingSkills, score } = analysis;

    const suggestions = [];

    if (missingSkills.length > 0) {
        missingSkills.slice(0, 4).forEach(kw => {
            suggestions.push({
                skill: kw,
                action: `Incorporate a specific bullet point demonstrating your proficiency with ${kw.toUpperCase()}.`,
                context: `The strategic listing prioritizes ${kw} as a core requirement.`
            });
        });
    }

    const improvedSummary = missingSkills.length > 0
        ? `Strategic Professional with a focus on ${missingSkills.slice(0, 2).join(' and ')}. Proven expertise in bridging technical gaps and delivering high-alignment solutions in competitive environments.`
        : "Highly optimized profile with 100% keyword coverage. Ready for immediate deployment in senior-level strategic roles.";

    return {
        originalScore: score,
        targetScore: Math.min(95, score + 25),
        suggestions,
        refinedNarrative: improvedSummary,
        impactStatement: "Implementing these refinements will harmonize your profile with the Match Intelligence Engine's primary criteria."
    };
};

module.exports = { explainMatch, generateImprovements };
