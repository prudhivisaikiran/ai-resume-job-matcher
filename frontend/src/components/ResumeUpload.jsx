import React, { useState } from 'react';

const ResumeUpload = ({ onUploadSuccess, token, apiUrl }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return setError('Please select a file');

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const res = await fetch(`${apiUrl}/api/resume/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const contentType = res.headers.get("content-type");
            let data;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await res.json();
            } else {
                const text = await res.text();
                console.error('Non-JSON response received:', text);
                throw new Error(`Server returned ${res.status} (${res.statusText})`);
            }

            if (res.ok) {
                onUploadSuccess(data);
                setFile(null);
                e.target.reset();
            } else {
                setError(data.message || `Upload failed with status ${res.status}`);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            if (err.message.includes('Failed to fetch')) {
                setError('Network connection refused. Please ensure the backend server is reachable.');
            } else {
                setError(`Upload Error: ${err.message}`);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card-premium animate-fadeIn" style={{ padding: '48px', border: '2px dashed var(--border)', background: 'var(--surface)', textAlign: 'center' }}>
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', background: 'var(--primary-soft)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '8px' }}>
                    📄
                </div>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>Initialize Match Context</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Upload your master resume (PDF or DOCX) for AI vectorization</p>
                </div>

                <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                    <input
                        type="file"
                        id="resume-upload"
                        style={{ display: 'none' }}
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="resume-upload"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px 24px',
                            background: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            color: file ? 'var(--primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: 'var(--shadow-sm)',
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {file ? file.name : 'SELECT CORE RESUME'}
                    </label>
                </div>

                {error && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: '700' }}>⚠️ {error}</p>
                )}

                <button
                    type="submit"
                    className="btn-ai btn-ai-primary"
                    style={{ width: '100%', maxWidth: '320px', padding: '16px', borderRadius: '12px', background: 'var(--text-main)' }}
                    disabled={uploading || !file}
                >
                    {uploading ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ animation: 'aiPulse 1s infinite' }}>⚡</span> VECTORIZING...
                        </span>
                    ) : 'ESTABLISH MATCH BASELINE'}
                </button>
            </form>
        </div>
    );
};

export default ResumeUpload;
