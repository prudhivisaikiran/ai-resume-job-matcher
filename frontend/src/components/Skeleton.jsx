import React from 'react';
import Card from './Card';

const Skeleton = ({ className = '', height = 'h-4', width = 'w-full', variant = 'text' }) => {
    // variant: text, circle, rect, card

    if (variant === 'card') {
        return (
            <Card className={`animate-pulse ${className}`}>
                <div className="flex gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-[var(--border)] rounded w-3/4"></div>
                        <div className="h-4 bg-[var(--border)] rounded w-1/2"></div>
                        <div className="space-y-2 pt-2">
                            <div className="h-4 bg-[var(--border)] rounded w-full"></div>
                            <div className="h-4 bg-[var(--border)] rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className={`animate-pulse bg-[var(--border)] rounded ${height} ${width} ${className} ${variant === 'circle' ? 'rounded-full' : ''}`}></div>
    );
};

export default Skeleton;
