import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary': return 'badge-primary';
            case 'success': return 'badge-success';
            case 'warning': return 'badge-warning';
            case 'danger': return 'badge-danger';
            default: return 'badge-neutral';
        }
    };

    return (
        <span className={`badge ${getVariantClass()} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
