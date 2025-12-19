import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgClass = type === 'error' ? 'var(--danger)' : 'var(--success)';
    const icon = type === 'error' ? '⚠️' : '✅';

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: bgClass,
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 9999,
            minWidth: '320px',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <span style={{ fontSize: '1.25rem' }}>{icon}</span>
            <span style={{ fontWeight: '600', fontSize: '0.875rem', flex: 1 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    opacity: 0.7,
                    padding: '4px'
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
