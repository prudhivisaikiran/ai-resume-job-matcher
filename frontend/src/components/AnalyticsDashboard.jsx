import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';
import Card from './Card';
import MetricCard from './MetricCard';
import Skeleton from './Skeleton';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsDashboard = ({ data, loading }) => {
    if (loading) {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton variant="card" height="h-28" />
                    <Skeleton variant="card" height="h-28" />
                    <Skeleton variant="card" height="h-28" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton variant="card" height="h-[350px]" />
                    <Skeleton variant="card" height="h-[350px]" />
                </div>
            </div>
        );
    }

    if (!data || data.totalJobs === 0) {
        return (
            <div className="text-center py-20 bg-[var(--surface)] rounded-xl border border-dashed border-[var(--border)]">
                <div className="text-4xl mb-4">📉</div>
                <h3 className="text-lg font-semibold text-[var(--text-main)]">No Analytics Data</h3>
                <p className="text-[var(--text-muted)] max-w-sm mx-auto mt-2">
                    Start by posting jobs and scanning resumes to see recruiter-level insights here.
                </p>
            </div>
        );
    }

    // Transform score buckets for chart
    const bucketData = Object.entries(data.scoreBuckets).map(([name, value]) => ({
        name,
        value
    }));

    // Transform skills for chart
    const skillData = data.topMissingSkills.map(item => ({
        name: item.skill,
        count: item.count
    }));

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Jobs Analyzed"
                    value={data.totalJobs}
                    icon="📋"
                />
                <MetricCard
                    title="Average Match Score"
                    value={`${data.avgMatchScore}%`}
                    icon="📊"
                />
                <MetricCard
                    title="Peak Match Score"
                    value={`${data.bestMatchScore}%`}
                    icon="🏆"
                    trend="Top Potential"
                    trendUp={true}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart 1: Match Score Distribution */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-[var(--text-main)]">Match Concentration</h3>
                        <p className="text-sm text-[var(--text-muted)]">Distribution of candidates across score percentages</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bucketData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'var(--primary-light)', opacity: 0.1 }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                                    {bucketData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Chart 2: Top Missing Skills */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-[var(--text-main)]">Market Capability Gaps</h3>
                        <p className="text-sm text-[var(--text-muted)]">Skills most frequently missing across your job pipeline</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={skillData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                                <Tooltip
                                    cursor={{ fill: 'var(--primary-light)', opacity: 0.1 }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" fill="var(--danger)" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
