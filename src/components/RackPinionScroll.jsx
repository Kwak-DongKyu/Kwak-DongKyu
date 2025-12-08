import React, { useEffect, useState } from 'react';

const RackPinionScroll = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [labelPositions, setLabelPositions] = useState({ intro: 10, papers: 50, contact: 90 });

    const calculatePositions = () => {
        // ---------------------------------------------------------------------------
        // [USER GUIDE] How to manually change label positions:
        //
        // Currently, the code automatically calculates where the labels should be 
        // based on the actual position of the sections (Intro, Papers, Contact) on the page.
        //
        // IF YOU WANT TO SET THEM MANUALLY (Fixed positions):
        // 1. Comment out or delete the entire logic below inside this function.
        // 2. Uncomment and use the setLabelPositions line below:
        //
        setLabelPositions({
            intro: 10,    // 10% from the top
            papers: 50,   // 50% (middle)
            contact: 90   // 90% from the top
        });
        return;
        // ---------------------------------------------------------------------------

        const totalDocHeight = document.documentElement.scrollHeight;
        const viewportHeight = document.documentElement.clientHeight;
        const scrollableHeight = totalDocHeight - viewportHeight;

        if (scrollableHeight <= 0) return;

        const getPosition = (id) => {
            const element = document.getElementById(id);
            if (!element) return 0;
            // Calculate the scroll percentage required to reach this element
            const ratio = element.offsetTop / scrollableHeight;
            return Math.min(Math.max(ratio * 100, 5), 95);
        };

        let introPos = getPosition('intro-section');
        let papersPos = getPosition('papers-section');
        let contactPos = getPosition('contact-section');

        // Enforce minimum gap of 20% to prevent overlap
        const minGap = 20;

        if (papersPos < introPos + minGap) {
            papersPos = introPos + minGap;
        }
        if (contactPos < papersPos + minGap) {
            contactPos = papersPos + minGap;
        }

        // Re-clamp if pushed too far down
        if (contactPos > 95) {
            contactPos = 95;
            if (papersPos > contactPos - minGap) papersPos = contactPos - minGap;
            if (introPos > papersPos - minGap) introPos = papersPos - minGap;
        }

        // MANUAL OVERRIDE:
        // If you want to manually set the positions of the letters on the rack,
        // you can comment out the calculation logic above and set them directly here:
        /*
        setLabelPositions({
            intro: 10,   // 10% from the top
            papers: 50,  // 50% from the top
            contact: 90  // 90% from the top
        });
        return; 
        */

        setLabelPositions({
            intro: introPos,
            papers: papersPos,
            contact: contactPos
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(Number(scroll));
        };

        // Initial calculation
        // Small timeout to ensure DOM is fully rendered
        setTimeout(calculatePositions, 100);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', calculatePositions);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', calculatePositions);
        };
    }, []);

    // Calculate rotation: 1 full scroll = multiple rotations
    const rotation = scrollProgress * 360 * 5;

    // Calculate vertical position: 0% to 100% of the container height
    const topPosition = scrollProgress * 100;

    return (
        <div className="rack-container">
            <div className="rack-rail">
                {/* Visual teeth of the rack */}
                <div className="rack-teeth"></div>

                {/* Section Labels placed along the rack */}
                <div className="rack-labels">
                    <div className="rack-label" style={{ top: `${labelPositions.intro}%` }}>
                        <span>I</span><span>N</span><span>T</span><span>R</span><span>O</span>
                    </div>
                    <div className="rack-label" style={{ top: `${labelPositions.papers}%` }}>
                        <span>P</span><span>A</span><span>P</span><span>E</span><span>R</span><span>S</span>
                    </div>
                    <div className="rack-label" style={{ top: `${labelPositions.contact}%` }}>
                        <span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span>
                    </div>
                </div>
            </div>

            {/* The Pinion (Gear) */}
            <div
                className="pinion"
                style={{
                    transform: `translateY(-50%) rotate(${rotation}deg)`,
                    top: `${topPosition}%`
                }}
            >
                ⚙️
            </div>
        </div>
    );
};

export default RackPinionScroll;
