import React from 'react';
import Introduction from './components/Introduction';
import PaperList from './components/PaperList';
import Footer from './components/Footer';
import RackPinionScroll from './components/RackPinionScroll';

function App() {
    return (
        <div className="app-container">
            <RackPinionScroll />
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
        </div>
    );
}

export default App;
