import React from 'react';
import linksData from '../data/links.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href={linksData.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
                <a href={linksData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={linksData.cv} target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
            <p>&copy; {new Date().getFullYear()} Kwak DongKyu. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
