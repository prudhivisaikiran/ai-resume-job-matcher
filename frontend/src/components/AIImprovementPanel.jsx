import React from 'react';

const AIImprovementPanel = ({ data, loading, onDismiss, onCopy }) => {
    if (loading) {
        return (
            <div className="ai-right-panel" style={{ opacity: 0.6 }}>
                <div style={{ height: '24px', width: '120px', background: 'var(--background)', borderRadius: '4px', marginBottom: '32px' }}></div>
                <div style={{ height: '80px', width: '100%', background: 'var(--background)', borderRadius: '12px', marginBottom: '32px' }}></div>
                <div style={{ height: '400px', width: '100%', background: 'var(--background)', borderRadius: '12px' }}></div>
            </div>
        );
    }

    if (!data) return null;

    const { originalScore, targetScore, suggestions, refinedNarrative, impactStatement } = data;

    return (
        <div className="ai-right-panel animate-slideRight" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 className="text-xs-caps" style={{ color: 'var(--primary)', marginBottom: '8px' }}>Refinement Synthesis</h2>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#111827' }}>Resume Fix Protocol</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                    <span className="badge-ai" style={{ background: '#e2e8f0', color: '#64748b' }}>{originalScore}% CURRENT</span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                    <span className="badge-ai" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>{targetScore}% PROJECTED</span>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px', paddingRight: '4px' }}>
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 className="text-xs-caps" style={{ color: 'var(--text-main)', fontSize: '0.7rem' }}>Refined Narrative</h3>
                        <button
                            onClick={() => onCopy(refinedNarrative)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                        >
                            COPY TO CLIPBOARD
                        </button>
                    </div>
                    <div style={{
                        padding: '16px',
                        background: 'white',
                        border: '1px solid var(--primary)',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.1)'
                    }}>
                        "{refinedNarrative}"
                    </div>
                </section>

                <section>
                    <h3 className="text-xs-caps" style={{ color: 'var(--text-main)', marginBottom: '16px', fontSize: '0.7rem' }}>Strategic Adjustments</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {suggestions.map((s, i) => (
                            <div key={i} style={{ padding: '16px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ width: '6px', height: '64px', background: 'var(--primary)', borderRadius: '3px' }}></span>
                                    <div>
                                        <h4 style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '2px' }}>Target: {s.skill}</h4>
                                        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4' }}>{s.action}</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '500', marginLeft: '14px' }}>{s.context}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'var(--primary-soft)',
                    border: '1px dashed var(--primary)',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>⚡ {impactStatement}</p>
                </div>
            </div>

            <div style={{ paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                <button
                    onClick={onDismiss}
                    className="btn-ai btn-ai-primary"
                    style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--text-main)' }}
                >
                    RETURN TO ANALYSIS
                </button>
            </div>
        </div>
    );
};

export default AIImprovementPanel;
