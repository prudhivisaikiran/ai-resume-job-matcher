import React from 'react';

const AIExplanationPanel = ({ details, loading, onDismiss, onGenerateFix }) => {
    if (loading) {
        return (
            <div className="ai-right-panel" style={{ opacity: 0.6 }}>
                <div style={{ height: '24px', width: '120px', background: 'var(--background)', borderRadius: '4px', marginBottom: '32px' }}></div>
                <div style={{ height: '16px', width: '100%', background: 'var(--background)', borderRadius: '4px', marginBottom: '16px' }}></div>
                <div style={{ height: '160px', width: '100%', background: 'var(--background)', borderRadius: '12px', marginBottom: '32px' }}></div>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="ai-right-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.4 }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔬</div>
                <p className="text-xs-caps" style={{ lineHeight: '2' }}>
                    Intelligence Standby<br />Select a match to explain
                </p>
            </div>
        );
    }

    const score = details?.score || 0;
    const explanation = details?.explanation || 'Precision analysis complete. Review relevant data points below.';
    const matchedSkills = details?.matchedSkills || [];
    const missingSkills = details?.missingSkills || [];
    const improvements = details?.improvements || [];

    // Determine Outcome
    let outcome = { label: 'Weak Match', bg: '#fef2f2', color: '#dc2626', border: '#fee2e2' };
    if (score >= 80) outcome = { label: 'Selected', bg: '#ecfdf5', color: '#059669', border: '#d1fae5' };
    else if (score >= 60) outcome = { label: 'Fair Match', bg: '#fffbeb', color: '#d97706', border: '#fef3c7' };

    return (
        <div className="ai-right-panel animate-slideRight" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 className="text-xs-caps" style={{ marginBottom: '16px' }}>Strategic Fit Explanation</h2>
                <div className="badge-ai" style={{
                    display: 'inline-block',
                    background: outcome.bg,
                    color: outcome.color,
                    border: `1px solid ${outcome.border}`,
                    padding: '4px 12px'
                }}>
                    {outcome.label}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Fit Summary */}
                <section>
                    <h3 className="text-xs-caps" style={{ color: 'var(--text-main)', marginBottom: '12px', fontSize: '0.7rem' }}>Strategic Fit Summary</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '500' }}>
                        {explanation}
                    </p>
                </section>

                {/* Key Matches */}
                <section>
                    <h3 className="text-xs-caps" style={{ color: 'var(--text-main)', marginBottom: '12px', fontSize: '0.7rem' }}>Key Matches</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {matchedSkills.map((skill, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                background: 'rgba(16, 185, 129, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(16, 185, 129, 0.1)'
                            }}>
                                <svg style={{ width: '14px', height: '14px', color: 'var(--success)' }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skill Gaps */}
                <section>
                    <h3 className="text-xs-caps" style={{ color: 'var(--text-main)', marginBottom: '12px', fontSize: '0.7rem' }}>Skill Gaps & Focus</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {missingSkills.map((skill, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                padding: '12px',
                                background: 'var(--background)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{skill}</span>
                                {improvements && improvements[i] && (
                                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '500', lineHeight: '1.4' }}>{improvements[i]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Core Assets */}
                <section>
                    <h3 className="text-xs-caps" style={{ marginBottom: '12px', fontSize: '0.6rem' }}>Core Assets Identified</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{
                            padding: '6px 16px',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: '800',
                            borderRadius: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                            {matchedSkills[0] || 'Leadership'}
                        </span>
                    </div>
                </section>
            </div>

            {/* Actions */}
            <div style={{ paddingTop: '32px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '800', textAlign: 'center', lineHeight: '1.6' }}>
                    Data provided by AI Vector Similarity models.<br />Verified against industry skill taxonomies.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={onDismiss} className="btn-ai btn-ai-secondary" style={{ flex: 1, padding: '14px', borderRadius: '12px' }}>DISMISS</button>
                    <button onClick={onGenerateFix} className="btn-ai btn-ai-primary" style={{ flex: 2, padding: '14px', borderRadius: '12px', background: 'var(--text-main)' }}>GENERATE RESUME FIX</button>
                </div>
            </div>
        </div>
    );
};

export default AIExplanationPanel;
