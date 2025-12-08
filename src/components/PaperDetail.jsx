import React, { useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import papersData from '../data/papers.json';

// Lazy load the ModelViewer to prevent 3D libraries from crashing the main app on load
const ModelViewer = lazy(() => import('./ModelViewer'));

const PaperDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const paper = papersData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!paper) {
        return (
            <div className="paper-detail-container">
                <h2>Paper not found</h2>
                <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="paper-detail-container">
            <button className="back-button" onClick={() => navigate('/')}>
                &larr; Back to Home
            </button>

            <div className="paper-detail-content glass-panel">

                {/* Top Row: Title/Info (Left) + 3D Model (Right) */}
                <div className="detail-top-row">
                    <div className="detail-header-group">
                        <span className="detail-type">{paper.type}</span>
                        <div className="detail-header">
                            <h1>{paper.title}</h1>
                            <p className="detail-venue">{paper.venue}</p>
                        </div>

                        <div className="detail-actions">
                            <a href={paper.link} target="_blank" rel="noopener noreferrer" className="read-paper-btn">
                                Read Full Paper
                            </a>
                        </div>
                    </div>

                    <div className="detail-model-group">
                        {paper.model ? (
                            <Suspense fallback={<div style={{ color: 'white', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading 3D Model...</div>}>
                                <ModelViewer
                                    modelUrl={import.meta.env.BASE_URL + paper.model}
                                    materialUrl={paper.material ? import.meta.env.BASE_URL + paper.material : null}
                                />
                            </Suspense>
                        ) : paper.image ? (
                            <img src={import.meta.env.BASE_URL + paper.image} alt={paper.title} className="detail-image" />
                        ) : (
                            <div className="media-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <p>No 3D Model or Image Available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Rows: Authors & Abstract */}
                <div className="detail-authors" style={{ marginBottom: '3rem' }}>
                    <h3>Authors</h3>
                    <p style={{ fontSize: '1.2rem', color: '#e2e8f0' }}>{paper.authors}</p>
                </div>

                <div className="detail-abstract">
                    <h3>Abstract</h3>
                    <p>
                        {paper.abstract ||
                            "This is a placeholder for the paper's abstract. Please add an 'abstract' field to your data."}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PaperDetail;
