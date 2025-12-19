import React from 'react';
import Card from './Card';

const HeroSection = ({ score, stats, loading }) => {
    // Score Gauge Logic
    const circumference = 2 * Math.PI * 90; // r=90
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="space-y-12 animate-fadeIn">
            {/* Title & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-indigo-100/50">Enterprise Edition v2.4</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-4">Strategic Resume <br /><span className="text-indigo-600">Intelligence</span></h1>
                    <p className="text-lg font-bold text-slate-400 tracking-tight leading-relaxed">Real-time AI alignment between candidate profile and job market demand.</p>
                </div>
            </div>

            {/* Primary Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Large Gauge Card */}
                <Card className="lg:col-span-12 p-12 rounded-[3.5rem] border-none shadow-[0_32px_80px_-20px_rgba(0,0,0,0.06)] bg-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50 group-hover:scale-125 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex flex-col gap-8 flex-1">
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">AI Match Intelligence Score</h3>
                                <p className="text-slate-400 font-bold text-sm tracking-tight">Probabilistic alignment based on 42 unique semantic vectors.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence Score</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">High (98%)</p>
                                </div>
                                <div className="p-6 bg-indigo-600 rounded-[2rem] shadow-xl text-white">
                                    <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Strategic Fit</p>
                                    <p className="text-2xl font-black tracking-tighter italic">Optimized</p>
                                </div>
                            </div>
                        </div>

                        {/* Animated Gauge */}
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="144"
                                    cy="144"
                                    r="110"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="24"
                                    className="text-slate-100"
                                />
                                <circle
                                    cx="144"
                                    cy="144"
                                    r="110"
                                    fill="transparent"
                                    stroke="url(#matchGradient)"
                                    strokeWidth="24"
                                    strokeDasharray={2 * Math.PI * 110}
                                    style={{
                                        strokeDashoffset: (2 * Math.PI * 110) - (score / 100) * (2 * Math.PI * 110),
                                        transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#4f46e5" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-7xl font-black text-slate-900 tracking-tighter">{score}%</span>
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Alignment</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default HeroSection;
