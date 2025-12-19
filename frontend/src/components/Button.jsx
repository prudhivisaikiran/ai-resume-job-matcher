import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary', // primary, secondary, outline, ghost, danger
    className = '',
    disabled = false,
    type = 'button'
}) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary'; // Helper class if needed or just use outline
            case 'outline': return 'btn-outline';
            case 'ghost': return 'btn-ghost';
            case 'danger': return 'bg-red-600 text-white hover:bg-red-700'; // Tailwind utility fallback or add to CSS
            default: return 'btn-primary';
        }
    };

    return (
        <button
            type={type}
            className={`btn ${getVariantClass()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
