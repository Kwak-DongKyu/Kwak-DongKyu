import React from 'react';

const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <button
                    className="nav-link"
                    onClick={() => scrollToSection('intro-section')}
                >
                    Intro
                </button>
                <div className="nav-separator"></div>
                <button
                    className="nav-link"
                    onClick={() => scrollToSection('papers-section')}
                >
                    Papers
                </button>
                <div className="nav-separator"></div>
                <button
                    className="nav-link"
                    onClick={() => scrollToSection('contact-section')}
                >
                    Contact
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
