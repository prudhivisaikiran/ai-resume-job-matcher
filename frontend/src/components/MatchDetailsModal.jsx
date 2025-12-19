import React from 'react';
import Modal from './Modal';
import Badge from './Badge';
import Button from './Button';

const MatchDetailsModal = ({ isOpen, onClose, details, loading, onImprove }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn" onClick={onClose} />

            <div className="bg-white rounded-[var(--radius-xl)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-fadeIn border border-[var(--border-strong)]">
                {/* Header Section */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-white to-[var(--background)]">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white text-xs shadow-lg font-black">
                                AI
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Match Intelligence Engine</span>
                        </div>
                        {loading ? (
                            <div className="h-8 w-64 bg-slate-100 animate-pulse rounded-full" />
                        ) : (
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                                {details?.jobTitle || 'Analysis'} <span className="text-slate-400 font-medium text-2xl">@ {details?.company || 'Organization'}</span>
                            </h2>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" /></svg>
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    {loading ? (
                        <div className="space-y-6">
                            <div className="h-48 bg-slate-50 animate-pulse rounded-3xl" />
                            <div className="h-44 bg-slate-50 animate-pulse rounded-3xl" />
                        </div>
                    ) : (
                        <>
                            {/* Score Visualization Card */}
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(15,23,42,0.3)] border border-white/5">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)] opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-10 rounded-full blur-[80px]" />

                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <p className="text-indigo-300 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Overall Alignment</p>
                                        <div className="flex items-baseline gap-1">
                                            <h3 className="text-7xl font-black tracking-tighter text-white">{details?.matchScore || 0}</h3>
                                            <span className="text-3xl font-bold text-indigo-400">%</span>
                                        </div>
                                    </div>

                                    <div className="relative w-32 h-32 flex items-center justify-center backdrop-blur-sm rounded-full bg-white/5 border border-white/10 group">
                                        <div className="text-4xl transition-transform duration-500 group-hover:scale-125">
                                            {details?.matchScore >= 80 ? '👑' : details?.matchScore >= 50 ? '⚡' : '🔍'}
                                        </div>
                                        <svg className="absolute inset-0 w-full h-full p-2 transform -rotate-90">
                                            <circle
                                                cx="56" cy="56" r="48"
                                                fill="transparent"
                                                stroke="rgba(255,255,255,0.05)"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                cx="56" cy="56" r="48"
                                                fill="transparent"
                                                stroke="var(--primary)"
                                                strokeWidth="10"
                                                strokeDasharray={301.6}
                                                strokeDashoffset={301.6 - (301.6 * (details?.matchScore || 0)) / 100}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-3 gap-4 relative z-10">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Matched Skills</p>
                                        <p className="text-2xl font-black text-emerald-400">{details?.matchedKeywords?.length || 0}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Skill Gaps</p>
                                        <p className="text-2xl font-black text-rose-400">{details?.missingKeywords?.length || 0}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1 tracking-widest">Outcome</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                            <p className="text-xs font-black text-emerald-400 uppercase">Selected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Analysis Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Side: Why Match */}
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-3 font-black text-slate-900 text-lg uppercase tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm transition-transform hover:rotate-12">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" /></svg>
                                        </div>
                                        Strategic Fit
                                    </h4>
                                    <ul className="space-y-4">
                                        {(details?.summary || []).length > 0 ? (
                                            details.summary.map((line, idx) => (
                                                <li key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                                                    <p className="text-sm font-semibold text-slate-600 leading-relaxed">{line}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-400 italic bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">No detailed analysis available.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Right Side: Keywords */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Assets Identified</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {details?.matchedKeywords?.map((kw, idx) => (
                                                <Badge key={idx} variant="success" className="px-4 py-1.5 text-[10px] font-black tracking-widest uppercase border-emerald-100 shadow-sm hover:translate-y-[-1px] transition-transform">
                                                    {kw}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Training Areas</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {details?.missingKeywords?.map((kw, idx) => (
                                                <Badge key={idx} variant="neutral" className="px-4 py-1.5 text-[10px] font-black tracking-widest uppercase text-slate-400 bg-slate-50 border-slate-200 hover:bg-white transition-colors">
                                                    {kw}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Section */}
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold max-w-sm uppercase tracking-wider leading-relaxed">
                        Data provided by AI Vector Similarity models. Verified against industry standard skill taxonomies.
                    </p>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none py-3.5 px-10 rounded-2xl shadow-sm bg-white font-black uppercase text-xs tracking-widest border-slate-200 hover:border-slate-300" onClick={onClose}>
                            Dismiss
                        </Button>
                        <Button className="flex-1 md:flex-none py-3.5 px-12 rounded-2xl shadow-[var(--glow-primary)] bg-[var(--primary)] font-black uppercase text-xs tracking-widest text-white hover:scale-105 transition-transform" onClick={onImprove}>
                            🔥 Generate Resume Fix
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailsModal;
