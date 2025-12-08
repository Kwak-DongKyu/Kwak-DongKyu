import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

const ModelViewer = lazy(() => import('./ModelViewer'));

const HighlightedPaper = ({ paper }) => {
    if (!paper) return null;

    return (
        <div className="highlighted-paper glass-panel">
            <div className="highlight-grid">
                <div className="highlight-info">
                    <span className="highlight-venue">{paper.venue}</span>
                    <h2 className="highlight-title">{paper.title}</h2>
                    <p className="highlight-authors">{paper.authors}</p>
                    <p className="highlight-abstract">
                        {paper.abstract || "No abstract available for this paper."}
                    </p>
                    <Link to={`/paper/${paper.id}`} className="read-paper-btn highlight-btn">
                        See Details
                    </Link>
                </div>
                <div className="highlight-model-container">
                    {paper.model ? (
                        <Suspense fallback={<div className="loading-text">Loading Model...</div>}>
                            <ModelViewer modelUrl={paper.model} materialUrl={paper.material} />
                        </Suspense>
                    ) : paper.image ? (
                        <img src={paper.image} alt={paper.title} className="highlight-image" />
                    ) : (
                        <div className="highlight-placeholder">No Preview</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HighlightedPaper;
