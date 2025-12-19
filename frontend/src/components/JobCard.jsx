import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';

const JobCard = ({ job, onExplain }) => {
    if (!job || !job._id) return null;
    const score = parseFloat(job.matchScore || 0);

    // Color Logic for Score
    const scoreStyles = score >= 80
        ? 'text-emerald-600 bg-emerald-50 border-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
        : score >= 60
            ? 'text-amber-600 bg-amber-50 border-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
            : 'text-rose-600 bg-rose-50 border-rose-100 shadow-[0_0_15px_rgba(239,68,68,0.15)]';

    return (
        <Card className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group border-slate-100">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-white transition-all duration-500 overflow-hidden">
                        <div className="text-slate-400 group-hover:text-[var(--primary)] transition-colors transform group-hover:scale-110 duration-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                    <div className="pt-1">
                        <h3 className="font-black text-slate-900 mb-1 leading-none tracking-tight group-hover:text-[var(--primary)] transition-colors">
                            {job.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{job.company}</span>
                        </div>
                    </div>
                </div>

                <div className={`px-4 py-1.5 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all duration-500 ${scoreStyles}`}>
                    {score}% Match
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
                    {job.description}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                        Full-Time
                    </span>
                    <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                        Remote
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5" /></svg>
                    <span className="text-[10px] font-black uppercase tracking-wider">Posted 2d ago</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-slate-300 hover:text-amber-500 transition-all rounded-xl hover:bg-amber-50 group/save">
                        <svg className="w-5 h-5 group-hover/save:fill-amber-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeWidth="2.5" /></svg>
                    </button>
                    <Button
                        onClick={() => onExplain(job._id)}
                        className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl bg-slate-900 border-none text-white hover:bg-[var(--primary)] hover:shadow-[var(--glow-primary)] transition-all"
                    >
                        Analyze
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default JobCard;
