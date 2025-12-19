import React from 'react';
import Button from './Button';

const EmptyState = ({ title, description, icon = "🔍", actionLabel, onAction }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-dashed border-[var(--border-strong)] rounded-[var(--radius-xl)] animate-fadeIn">
            <div className="w-20 h-20 bg-[var(--background)] rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{title}</h3>
            <p className="text-[var(--text-secondary)] max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && (
                <Button onClick={onAction} className="px-8 py-3 rounded-xl">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
