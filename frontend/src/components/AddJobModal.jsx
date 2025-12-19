import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const AddJobModal = ({ isOpen, onClose, onAdd, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        location: '' // Optional, backend doesn't explicitly require it but good to have
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Post a New Job">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">Job Title *</label>
                    <input
                        className="input"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior React Developer"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Company *</label>
                        <input
                            className="input"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. TechCorp"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Location</label>
                        <input
                            className="input"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Remote / NY"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">Job Description *</label>
                    <textarea
                        className="input min-h-[120px]"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the role, responsibilities, and requirements..."
                        required
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                    <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Posting...' : 'Create Job'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddJobModal;
