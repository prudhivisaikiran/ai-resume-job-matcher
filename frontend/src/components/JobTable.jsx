import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';

const JobTable = ({ jobs, onExplain }) => {
    return (
        <Card className="overflow-hidden" noPadding>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)]">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-[var(--text-secondary)]">Company & Role</th>
                            <th className="px-6 py-4 font-semibold text-[var(--text-secondary)]">Match Score</th>
                            <th className="px-6 py-4 font-semibold text-[var(--text-secondary)]">Status</th>
                            <th className="px-6 py-4 font-semibold text-[var(--text-secondary)] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {jobs.map((job) => {
                            if (!job || !job._id) return null;
                            const score = parseFloat(job.matchScore || 0);
                            let scoreColor = 'bg-[var(--danger)]';
                            if (score >= 80) scoreColor = 'bg-[var(--success)]';
                            else if (score >= 60) scoreColor = 'bg-[var(--warning)]';

                            return (
                                <tr key={job._id} className="hover:bg-[var(--background)] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[var(--text-main)]">{job.title}</div>
                                        <div className="text-[var(--text-secondary)] text-xs">{job.company}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${scoreColor}`}
                                                    style={{ width: `${score}%` }}
                                                />
                                            </div>
                                            <span className="font-medium">{score}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {score >= 90 ? (
                                            <Badge variant="success">Best Match 🔥</Badge>
                                        ) : score >= 70 ? (
                                            <Badge variant="primary">Good Fit</Badge>
                                        ) : (
                                            <Badge variant="neutral">Review</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" className="text-xs" onClick={() => onExplain(job._id)}>
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-[var(--text-muted)]">
                                    No matches found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default JobTable;
