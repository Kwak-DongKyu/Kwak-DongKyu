import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import PaperList from './components/PaperList';
import Footer from './components/Footer';
import RackPinionScroll from './components/RackPinionScroll';
import PaperDetail from './components/PaperDetail';

function Home() {
    return (
        <>
            <RackPinionScroll />
            <Navbar />
            <main>
                <div id="intro-section">
                    <Introduction />
                </div>
                <div id="papers-section">
                    <PaperList />
                </div>
            </main>
            <div id="contact-section">
                <Footer />
            </div>
        </>
    );
}

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paper/:id" element={<PaperDetail />} />
            </Routes>
        </div>
    );
}

export default App;
