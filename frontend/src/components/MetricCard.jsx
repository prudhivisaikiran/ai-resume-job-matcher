import React from 'react';
import Card from './Card';

const MetricCard = ({ title, value, icon, trend, trendUp }) => {
    return (
        <Card className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
                <span className="text-xl p-2 bg-[var(--background)] rounded-lg">{icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--text-main)]">{value}</span>
                {trend && (
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${trendUp ? 'text-[var(--success)] bg-[var(--success-bg)]' : 'text-[var(--danger)] bg-[var(--danger-bg)]'
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
        </Card>
    );
};

export default MetricCard;
