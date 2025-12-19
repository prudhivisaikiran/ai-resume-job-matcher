const OpenAI = require('openai');

let openai;

const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is missing in environment variables');
    }
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
};

// --- LOCAL EMBEDDING LOGIC ---
const VECTOR_SIZE = 256;

const generateLocalEmbedding = (text) => {
    // 1. Initialize zero vector
    const vector = new Array(VECTOR_SIZE).fill(0);

    // 2. Tokenize (lowercase, remove non-word chars, split by space)
    const tokens = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2);

    if (tokens.length === 0) return vector;

    // 3. Simple Hashing Vectorizer
    tokens.forEach(token => {
        let hash = 0;
        for (let i = 0; i < token.length; i++) {
            hash = ((hash << 5) - hash) + token.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        const index = Math.abs(hash) % VECTOR_SIZE;
        // Increment dimension (simple frequency count)
        vector[index] += 1;
    });

    // 4. Normalize to Unit Vector (L2 Norm)
    let magnitude = 0;
    for (let i = 0; i < VECTOR_SIZE; i++) {
        magnitude += vector[i] * vector[i];
    }

    magnitude = Math.sqrt(magnitude);

    if (magnitude > 0) {
        for (let i = 0; i < VECTOR_SIZE; i++) {
            vector[i] = vector[i] / magnitude;
        }
    }

    return vector;
};

// --- MAIN EXPORT ---

const getEmbedding = async (text) => {
    try {
        if (!text || typeof text !== 'string') {
            throw new Error('Invalid text input for embedding');
        }

        // Clean text
        const cleanedText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

        const mode = process.env.AI_MODE || 'local';

        if (mode === 'openai') {
            console.log('Generating OpenAI Embedding...');
            const response = await getOpenAIClient().embeddings.create({
                model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
                input: cleanedText,
            });
            return response.data[0].embedding;
        } else {
            // Default to Local
            console.log('Generating Local Embedding...');
            return generateLocalEmbedding(cleanedText);
        }

    } catch (error) {
        console.error('Error generating embedding:', error.message);
        throw error;
    }
};

const cosineSimilarity = (vecA, vecB) => {
    if (!vecA || !vecB || vecA.length !== vecB.length) {
        // Fallback for dimension mismatch (e.g. switching modes mid-project)
        console.warn(`Vector dimension mismatch: ${vecA?.length} vs ${vecB?.length}. Returning 0.`);
        return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

module.exports = {
    getEmbedding,
    cosineSimilarity
};
