import React from 'react';

function App() {
    return (
        <div className="app-container">
            <header className="hero">
                <nav className="navbar">
                    <div className="logo">AI Resume Matcher</div>
                    <div className="nav-links">
                        <button className="btn-text">Log In</button>
                        <button className="btn-primary">Sign Up</button>
                    </div>
                </nav>

                <main className="hero-content">
                    <h1>AI-Powered Job Matching & <br /> Resume Intelligence</h1>
                    <p>Optimize your resume and find the perfect job match with our advanced AI algorithms.</p>
                    <div className="cta-group">
                        <button className="btn-primary large">Get Started</button>
                        <button className="btn-secondary large">Sign In</button>
                    </div>
                </main>
            </header>
        </div>
    );
}

export default App;
