import React from 'react';

const MatchesToolbar = ({ totalCount, onSortChange, onFilterChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm mb-6">
            <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[var(--text-main)]">
                    Relevant Matches <span className="ml-1 px-2 py-0.5 bg-[var(--background)] rounded-md text-[var(--primary)] font-mono">{totalCount}</span>
                </span>
                <div className="h-4 w-[1px] bg-[var(--border)]"></div>
                {/* Visual Chips for Active Filters */}
                <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-[var(--primary-light)] text-[var(--primary)] rounded-lg text-[10px] font-bold border border-[var(--primary-light)]">
                        Min Match: 50%+ ✕
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search in results (UI mock) */}
                <div className="relative flex-1 sm:w-48">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">🔍</span>
                    <input
                        type="text"
                        placeholder="Filter list..."
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-[var(--primary)]"
                    />
                </div>

                <select
                    onChange={(e) => onSortChange(e.target.value)}
                    className="bg-white border border-[var(--border)] rounded-lg py-1.5 px-3 text-xs font-medium focus:outline-none hover:border-[var(--border-strong)] transition-colors"
                >
                    <option value="score">Sort by Match %</option>
                    <option value="recent">Sort by Recent</option>
                    <option value="company">Sort by Company</option>
                </select>
            </div>
        </div>
    );
};

export default MatchesToolbar;
