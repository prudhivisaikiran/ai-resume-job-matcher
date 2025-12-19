import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

const ResumeContextCard = ({ activeResumeId, onRefresh, onUpload, onClear }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!activeResumeId) return;
        navigator.clipboard.writeText(activeResumeId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="relative overflow-hidden group border-slate-100 shadow-premium">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--primary)] group-hover:w-2 transition-all"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left: Branding & Status */}
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-white transition-all duration-500">
                        <div className="text-slate-400 group-hover:text-[var(--primary)] transition-colors transform group-hover:scale-110 duration-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="font-black text-slate-900 text-lg tracking-tight">Candidate Context</h3>
                            <div className="flex gap-2">
                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${activeResumeId ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeResumeId ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                    {activeResumeId ? 'Live' : 'No Data'}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                    AI-Sync On
                                </span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-500">Analyze real-time job alignment for the active candidate profile.</p>
                    </div>
                </div>

                {/* Center: ID Control */}
                <div className="flex-1 max-w-lg w-full">
                    <div className="relative group/id">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-4 px-1.5 bg-white z-10 transition-colors group-hover/id:text-[var(--primary)]">
                            Active Reference ID
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    readOnly
                                    value={activeResumeId || ''}
                                    placeholder="Upload a resume to begin synchronization..."
                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-mono font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all cursor-default placeholder:text-slate-300"
                                />
                                <button
                                    onClick={handleCopy}
                                    disabled={!activeResumeId}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[var(--primary)] transition-all disabled:opacity-30"
                                    title="Copy Reference ID"
                                >
                                    {copied ? (
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeWidth="2" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onClear} disabled={!activeResumeId} className="rounded-2xl px-5 py-3 font-black text-[10px] uppercase tracking-widest border-slate-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all">
                        Clear
                    </Button>
                    <Button onClick={onRefresh} disabled={!activeResumeId} className="rounded-2xl px-8 py-3 font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-[var(--glow-primary)] transition-all flex items-center gap-2">
                        <svg className={`w-4 h-4 ${activeResumeId ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2.5" /></svg>
                        Refresh Engine
                    </Button>
                </div>
            </div>

            {!activeResumeId && (
                <div className="mt-8 p-5 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] flex flex-col sm:flex-row items-center gap-6 animate-fadeIn relative overflow-hidden group/warn">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 opacity-50"></div>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-amber-100 shrink-0">
                        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5" /></svg>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-black text-amber-900 uppercase tracking-tight mb-1">Onboarding Required</p>
                        <p className="text-xs font-semibold text-amber-700/80 leading-relaxed max-w-lg">Upload a candidate resume to unlock the semantic matching engine and detailed gap analysis.</p>
                    </div>
                    <Button onClick={onUpload} className="bg-amber-500 hover:bg-amber-600 shadow-[0_4px_15px_rgba(245,158,11,0.3)] border-none text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-2xl text-white transition-all hover:scale-105 active:scale-95">
                        Start Analysis
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default ResumeContextCard;
