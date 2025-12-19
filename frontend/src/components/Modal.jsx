import React from 'react';
import { createPortal } from 'react-dom';
import Card from './Card';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scaleIn shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-[var(--border)] pb-4">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">{title}</h3>
                    <Button variant="ghost" className="!p-2" onClick={onClose}>✕</Button>
                </div>
                <div>
                    {children}
                </div>
            </Card>
        </div>,
        document.body
    );
};

export default Modal;
