import React from 'react';

const Card = ({ children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm transition-all duration-300 hover:shadow-premium ${!noPadding ? 'p-6' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
