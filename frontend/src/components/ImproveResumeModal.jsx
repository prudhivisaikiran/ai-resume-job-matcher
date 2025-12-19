import React from 'react';
import Modal from './Modal';
import Badge from './Badge';
import Button from './Button';

const ImproveResumeModal = ({ isOpen, onClose, improvements, loading }) => {
    if (loading) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Generating Suggestions...">
                <div className="p-8 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--text-secondary)]">AI is analyzing gaps and crafting content...</p>
                </div>
            </Modal>
        );
    }

    if (!improvements) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Resume Improvement Guide">
            <div className="space-y-6">

                {/* Executive Summary */}
                <div className="bg-[var(--primary-light)] p-5 rounded-lg border border-[var(--primary)] border-opacity-20">
                    <h4 className="font-bold text-[var(--primary)] mb-2 flex items-center gap-2">
                        🚀 Enhancement Strategy
                    </h4>
                    <p className="text-[var(--text-main)] text-sm leading-relaxed">
                        {improvements.improvedSummary}
                    </p>
                </div>

                {/* Missing Skills */}
                <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase mb-3 flex items-center gap-2">
                        ⚠️ High-Impact Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {improvements.missingSkills && improvements.missingSkills.length > 0 ? (
                            improvements.missingSkills.map((kw, i) => (
                                <Badge key={i} variant="danger" className="px-3 py-1 bg-[var(--danger-bg)] text-[var(--danger)]">
                                    {kw}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-sm text-[var(--success)]">Great job! No major keywords missing.</span>
                        )}
                    </div>
                </div>

                {/* Actionable Suggestions */}
                <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase mb-3 flex items-center gap-2">
                        📝 Action Plan
                    </h4>
                    <ul className="space-y-3">
                        {improvements.suggestions && improvements.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex gap-3 text-sm text-[var(--text-main)] bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                                <span className="text-[var(--primary)] font-bold">{i + 1}.</span>
                                <span dangerouslySetInnerHTML={{ __html: suggestion.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end pt-4">
                    <Button onClick={onClose}>Got it</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ImproveResumeModal;
