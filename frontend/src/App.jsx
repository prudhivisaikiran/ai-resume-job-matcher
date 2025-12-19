import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Navbar from './components/Navbar';
import StrategicInventory from './components/StrategicInventory';
import AIExplanationPanel from './components/AIExplanationPanel';
import AIImprovementPanel from './components/AIImprovementPanel';
import ResumeUpload from './components/ResumeUpload';
import Toast from './components/Toast';
import { API_BASE } from './config/api';

function App() {
    // Auth & Global State
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const [authLoading, setAuthLoading] = useState(false);

    // Business State
    const [activeResumeId, setActiveResumeId] = useState(localStorage.getItem('activeResumeId') || '');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeJobId, setActiveJobId] = useState(null);
    const [matchDetails, setMatchDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [fixDetails, setFixDetails] = useState(null);
    const [fixLoading, setFixLoading] = useState(false);
    const [showPostJob, setShowPostJob] = useState(false);
    const [showResumeUpload, setShowResumeUpload] = useState(!localStorage.getItem('activeResumeId'));
    const [toast, setToast] = useState(null);

    // Form Stats
    const [newJob, setNewJob] = useState({ title: '', company: '', location: '', description: '' });

    useEffect(() => {
        if (isLoggedIn && token) {
            fetchJobs();
        }
    }, [isLoggedIn, token, activeResumeId]);

    const showToast = (message, type = 'success') => setToast({ message, type });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const endpoint = activeResumeId ? `/api/jobs/match?resumeId=${activeResumeId}` : '/api/jobs';
            const res = await fetch(`${API_BASE}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                if (activeResumeId) {
                    setJobs(data.filter(i => i && i.job).map(i => ({ ...i.job, matchScore: i.matchScore })));
                } else {
                    setJobs(data.map(j => ({ ...j, matchScore: 0 })));
                }
            }
        } catch (err) {
            console.error('Fetch Jobs Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAuth = async (e) => {
        if (e) e.preventDefault();
        setAuthLoading(true);
        try {
            const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
            const body = authMode === 'login' ? { email, password } : { name, email, password };
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                setIsLoggedIn(true);
                localStorage.setItem('token', data.token);
                showToast(authMode === 'login' ? 'Engine Initialized.' : 'Core Registered.');
            } else {
                showToast(data.message || 'Authentication Failed', 'error');
            }
        } catch (err) {
            console.error('Auth Error:', err);
            showToast('Connectivity Error: Registry Unreachable', 'error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleResumeUploadSuccess = (payload) => {
        const id = payload?.resumeId || payload?.id || payload?.resume?._id || payload?._id;
        setActiveResumeId(id);
        localStorage.setItem('activeResumeId', id);
        setShowResumeUpload(false);
        showToast('Engine Context Optimized.');
    };

    const handleJobSelect = async (jobId) => {
        setActiveJobId(jobId);
        setDetailsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/jobs/${jobId}/explain?resumeId=${activeResumeId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setMatchDetails(data);
            } else {
                showToast(data.message || 'Analysis Failed', 'error');
            }
        } catch (err) {
            console.error('Analysis Error:', err);
            showToast('Strategic Intelligence Unreachable', 'error');
        } finally { setDetailsLoading(false); }
    };

    const handleGenerateFix = async (jobId) => {
        setFixLoading(true);
        showToast('Synthesizing Resume Fix...', 'info');
        try {
            const res = await fetch(`${API_BASE}/api/jobs/${jobId}/improve?resumeId=${activeResumeId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setFixDetails(data);
            } else {
                showToast(data.message || 'Fix Synthesis Failed', 'error');
            }
        } catch (err) {
            console.error('Fix Error:', err);
            showToast('Improvement Engine Offline', 'error');
        } finally {
            setFixLoading(false);
        }
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showToast('Copied to Clipboard!');
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/api/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newJob)
            });
            if (res.ok) {
                setShowPostJob(false);
                setNewJob({ title: '', company: '', location: '', description: '' });
                fetchJobs();
                showToast('Strategic Asset Logged.');
            }
        } catch (err) { showToast('Sync Error', 'error'); }
    };

    const activeMatch = useMemo(() => jobs.find(j => j._id === activeJobId) || jobs[0], [jobs, activeJobId]);
    const score = activeMatch?.matchScore || 0;
    const chartData = useMemo(() => [
        { name: 'Match', value: score, color: '#4f46e5' },
        { name: 'Gap', value: 100 - score, color: '#f1f5f9' }
    ], [score]);

    // Render logic moved to a helper for cleaner conditional logic
    const renderAuth = () => (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
            <div className="card-premium animate-fadeIn" style={{ width: '100%', maxWidth: '400px', padding: '48px', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '56px', height: '56px', background: '#4f46e5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)' }}>
                        <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827', letterSpacing: '-0.04em', lineHeight: '1' }}>ResumeAI</h1>
                    <p className="text-xs-caps" style={{ marginTop: '8px' }}>Intelligence Platform</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                        <button
                            type="button"
                            onClick={() => setAuthMode('login')}
                            style={{ flex: 1, padding: '10px', fontSize: '0.75rem', fontWeight: '800', borderRadius: '8px', border: 'none', background: authMode === 'login' ? 'white' : 'transparent', color: authMode === 'login' ? '#111827' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', boxShadow: authMode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                            LOG IN
                        </button>
                        <button
                            type="button"
                            onClick={() => setAuthMode('register')}
                            style={{ flex: 1, padding: '10px', fontSize: '0.75rem', fontWeight: '800', borderRadius: '8px', border: 'none', background: authMode === 'register' ? 'white' : 'transparent', color: authMode === 'register' ? '#111827' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', boxShadow: authMode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                            SIGN UP
                        </button>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {authMode === 'register' && (
                            <div>
                                <label className="text-xs-caps" style={{ display: 'block', marginBottom: '8px' }}>Entity Descriptor</label>
                                <input className="jt-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
                            </div>
                        )}
                        <div>
                            <label className="text-xs-caps" style={{ display: 'block', marginBottom: '8px' }}>Identity Root</label>
                            <input className="jt-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@organization.ai" required />
                        </div>
                        <div>
                            <label className="text-xs-caps" style={{ display: 'block', marginBottom: '8px' }}>Secure Gateway</label>
                            <input className="jt-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                        </div>
                        <button type="submit" className="btn-ai btn-ai-primary" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: '#111827', marginTop: '12px' }} disabled={authLoading}>
                            {authLoading ? 'Verifying...' : (authMode === 'login' ? 'INITIALIZE ENGINE' : 'REGISTER CORE')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    const renderDashboard = () => (
        <div style={{ height: '100vh', background: '#f9fafb', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Navbar userEmail={email} onLogout={() => { localStorage.clear(); setIsLoggedIn(false); window.location.reload(); }} />

            <div className="ai-dashboard-layout" style={{ flex: 1, display: 'flex' }}>
                <StrategicInventory
                    jobs={jobs}
                    activeJobId={activeJobId}
                    onJobSelect={handleJobSelect}
                    onPostClick={() => { setShowPostJob(true); setShowResumeUpload(false); }}
                    onUploadClick={() => { setShowResumeUpload(true); setShowPostJob(false); }}
                />

                <main className="ai-main-panel">
                    {showPostJob && (
                        <div className="card-premium animate-fadeIn" style={{ border: '2px solid #e0e7ff', background: '#f5f7ff', padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827', tracking: '-0.02em' }}>Strategic Asset Definition</h2>
                                    <p className="text-xs-caps" style={{ marginTop: '4px' }}>Configure Target Alignment Requirement</p>
                                </div>
                                <button onClick={() => setShowPostJob(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                    <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" /></svg>
                                </button>
                            </div>
                            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <label className="jt-label">Target Title</label>
                                        <input className="jt-input" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} placeholder="e.g. Senior Staff AI Engineer" required />
                                    </div>
                                    <div>
                                        <label className="jt-label">Organization</label>
                                        <input className="jt-input" value={newJob.company} onChange={e => setNewJob({ ...newJob, company: e.target.value })} placeholder="e.g. OpenAI" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="jt-label">Geographic Context</label>
                                    <input className="jt-input" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} placeholder="e.g. San Francisco, CA" required />
                                </div>
                                <div>
                                    <label className="jt-label">Strategic Requirements (Description)</label>
                                    <textarea className="jt-input" style={{ minHeight: '120px', resize: 'none' }} value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} placeholder="Paste the depth of technical expectations..." required />
                                </div>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={() => setShowPostJob(false)} className="btn-ai btn-ai-secondary">CANCEL</button>
                                    <button type="submit" className="btn-ai btn-ai-primary" style={{ background: '#4f46e5' }}>COMMIT TO INVENTORY</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {showResumeUpload && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827' }}>Match Context Protocol</h2>
                                    <p className="text-xs-caps" style={{ marginTop: '4px' }}>Initialize Intelligence Foundation</p>
                                </div>
                                {activeResumeId && (
                                    <button onClick={() => setShowResumeUpload(false)} className="btn-ai btn-ai-secondary" style={{ fontSize: '0.7rem' }}>DISMISS</button>
                                )}
                            </div>
                            <ResumeUpload
                                token={token}
                                apiUrl={API_BASE}
                                onUploadSuccess={handleResumeUploadSuccess}
                            />
                        </div>
                    )}

                    {!showPostJob && !showResumeUpload && (
                        <>
                            <div>
                                <h2 className="text-xs-caps" style={{ color: '#4f46e5', marginBottom: '12px' }}>AI Match Intelligence Engine</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', letterSpacing: '-0.04em' }}>
                                        {activeMatch ? `Analysis @ ${activeMatch.company}` : 'Analysis Engine Ready'}
                                    </h1>
                                    <div className="badge-ai" style={{ background: '#ecfdf5', color: '#10b981', border: '1px solid #d1fae5' }}>VERIFIED_SIMILARITY</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="card-premium" style={{ padding: '32px', position: 'relative' }}>
                                    <span className="text-xs-caps" style={{ position: 'absolute', top: '24px', left: '24px' }}>Overall Alignment %</span>
                                    <div style={{ width: '100%', height: '200px', marginTop: '20px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={chartData} innerRadius={65} outerRadius={85} startAngle={180} endAngle={0} paddingAngle={0} dataKey="value">
                                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                                            <span style={{ fontSize: '3rem', fontWeight: '900', color: '#111827' }}>{score}%</span>
                                            <span className="text-xs-caps" style={{ fontSize: '0.6rem' }}>Similarity Index</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-premium" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="text-xs-caps" style={{ marginBottom: '16px' }}>Matched Skills Count</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                        <span style={{ fontSize: '3.5rem', fontWeight: '900', color: '#111827' }}>{matchDetails?.matchedSkills?.length || 0}</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#94a3b8' }}>/ {(matchDetails?.matchedSkills?.length || 0) + (matchDetails?.missingSkills?.length || 0)}</span>
                                    </div>
                                    <div style={{ width: '100%', background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '16px' }}>
                                        <div style={{ width: `${(matchDetails?.matchedSkills?.length / ((matchDetails?.matchedSkills?.length || 1) + (matchDetails?.missingSkills?.length || 0))) * 100}%`, height: '100%', background: '#4f46e5', transition: 'width 1s ease-out' }}></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="card-premium" style={{ padding: '24px', border: '1px solid #e0e7ff', background: '#ffffff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 className="text-xs-caps" style={{ marginBottom: '8px' }}>Active Reference ID</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <input readOnly value={activeResumeId || 'SYSTEM_STANDBY'} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', color: '#4f46e5', width: '360px', fontFamily: 'monospace' }} />
                                    <button onClick={() => fetchJobs()} style={{ padding: '8px', color: '#4f46e5', background: 'transparent', border: 'none', cursor: 'pointer' }}><svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="3" /></svg></button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => { localStorage.removeItem('activeResumeId'); setActiveResumeId(''); }} className="btn-ai btn-ai-secondary" style={{ fontSize: '0.7rem' }}>CLEAR ENGINE</button>
                                <button onClick={() => fetchJobs()} className="btn-ai btn-ai-primary" style={{ fontSize: '0.7rem' }}>REFRESH ENGINE</button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#111827', tracking: '-0.02em' }}>Relevant Matches</h2>
                                <p className="text-xs-caps" style={{ marginTop: '4px' }}>Cross-Reference Similarity Results</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <span className="text-xs-caps" style={{ color: '#4f46e5' }}>Min Threshold: 50%+</span>
                                <button style={{ background: 'transparent', border: 'none', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', cursor: 'pointer' }}>SORT BY %</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '40px' }}>
                            {jobs.map(job => (
                                <div key={job._id} className="card-premium" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#cbd5e1' }}>{job.company?.[0] || 'J'}</div>
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#111827', marginBottom: '4px' }}>{job.title}</h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span className="text-xs-caps" style={{ fontSize: '0.6rem' }}>{job.company}</span>
                                                <div style={{ width: '4px', height: '4px', background: '#e2e8f0', borderRadius: '100%' }}></div>
                                                <span className="text-xs-caps" style={{ fontSize: '0.6rem', color: '#64748b' }}>{job.type || 'Full-Time'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827' }}>{job.matchScore || 0}%</span>
                                            <p className="text-xs-caps" style={{ fontSize: '0.5rem' }}>SIMILARITY</p>
                                        </div>
                                        <button onClick={() => handleJobSelect(job._id)} className="btn-ai btn-ai-primary" style={{ background: '#111827', padding: '8px 20px', fontSize: '0.65rem' }}>ANALYZE</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {fixDetails || fixLoading ? (
                    <AIImprovementPanel
                        data={fixDetails}
                        loading={fixLoading}
                        onDismiss={() => setFixDetails(null)}
                        onCopy={handleCopyToClipboard}
                    />
                ) : (
                    <AIExplanationPanel
                        details={matchDetails}
                        loading={detailsLoading}
                        onDismiss={() => { setMatchDetails(null); setActiveJobId(null); }}
                        onGenerateFix={() => handleGenerateFix(activeJobId)}
                    />
                )}
            </div>
        </div>
    );

    return (
        <>
            {isLoggedIn ? renderDashboard() : renderAuth()}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </>
    );
}

export default App;
