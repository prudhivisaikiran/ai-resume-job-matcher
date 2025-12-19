import React from 'react';

const StrategicInventory = ({ onPostClick, onUploadClick, jobs, activeJobId, onJobSelect }) => {
    return (
        <div className="ai-sidebar flex flex-col h-full">
            <div style={{ marginBottom: '32px' }}>
                <h2 className="text-xs-caps" style={{ marginBottom: '16px' }}>Live Matching</h2>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.025em' }}>Strategic Inventory</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {/* Upload Action */}
                <button
                    onClick={onUploadClick}
                    className="card-premium"
                    style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '1px solid var(--primary-soft)',
                        background: 'var(--primary-soft)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h3 style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Upload Context</h3>
                        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600' }}>Update Reference Resume</p>
                    </div>
                </button>

                {/* Post Action */}
                <button
                    onClick={onPostClick}
                    className="card-premium"
                    style={{
                        width: '100%',
                        padding: '16px 20px',
                        border: '1px solid var(--border)',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <div style={{ width: '32px', height: '32px', background: 'var(--text-main)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h3 style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Post Listing</h3>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>Add Req for Comparison</p>
                    </div>
                </button>
            </div>

            {/* Job Listings Scroll Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h2 className="text-xs-caps" style={{ marginBottom: '4px', fontSize: '10px' }}>Active Matches</h2>
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        onClick={() => onJobSelect(job._id)}
                        className="card-premium"
                        style={{
                            padding: '16px',
                            cursor: 'pointer',
                            background: activeJobId === job._id ? 'var(--primary-soft)' : 'white',
                            borderColor: activeJobId === job._id ? 'var(--primary)' : 'var(--border)',
                            boxShadow: activeJobId === job._id ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{
                                fontSize: '10px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: activeJobId === job._id ? 'var(--primary)' : 'var(--background)',
                                color: activeJobId === job._id ? 'white' : 'var(--text-secondary)'
                            }}>
                                {job.type || 'Full Time'}
                            </span>
                            {job.matchScore > 0 && (
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    color: job.matchScore > 80 ? 'var(--success)' : 'var(--warning)'
                                }}>
                                    {job.matchScore}% FIT
                                </span>
                            )}
                        </div>
                        <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: '800',
                            color: activeJobId === job._id ? 'var(--primary)' : 'var(--text-main)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '2px'
                        }}>
                            {job.title}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{job.company}</p>
                    </div>
                ))}

                {jobs.length === 0 && (
                    <div style={{ padding: '48px 0', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', opacity: 0.2, marginBottom: '8px' }}>📂</div>
                        <p className="text-xs-caps">Inventory Empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategicInventory;
