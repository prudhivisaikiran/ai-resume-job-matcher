import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, currentView, onViewChange, onLogout, userEmail, activeResumeId, onChangeResume }) => {
    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar
                currentView={currentView}
                onViewChange={onViewChange}
                activeResumeId={activeResumeId}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar
                    onLogout={onLogout}
                    userEmail={userEmail}
                    activeResumeId={activeResumeId}
                    onChangeResume={onChangeResume}
                />

                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
