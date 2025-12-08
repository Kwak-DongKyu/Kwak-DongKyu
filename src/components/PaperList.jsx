import React, { useState } from 'react';
import papersData from '../data/papers.json';
import { Link } from 'react-router-dom';
import HighlightedPaper from './HighlightedPaper';

const PaperList = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Conference', 'Journal', 'Demo', 'Poster'];

    // Select the "Highlighted" paper (marked in papers.json)
    const highlightedPaper = papersData.find(p => p.highlighted);

    const filteredPapers = filter === 'All'
        ? papersData
        : papersData.filter(paper => paper.type === filter);

    return (
        <section className="paper-list">
            <h2>Published Papers</h2>

            {/* Render Highlighted Paper if it exists */}
            <div style={{ maxWidth: '1000px', margin: '0 auto 4rem auto' }}>
                {highlightedPaper && <HighlightedPaper paper={highlightedPaper} />}
            </div>

            <div className="filters">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={filter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <ul>
                {filteredPapers.map(paper => (
                    <li key={paper.id} className="paper-item">
                        <Link to={`/paper/${paper.id}`} className="paper-link-wrapper">
                            <div className="paper-thumbnail">
                                {paper.image ? (
                                    <img src={paper.image} alt={paper.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div className="thumbnail-placeholder" />
                                )}
                            </div>
                            <div className="paper-content">
                                <h3>{paper.title}</h3>
                                <p>{paper.authors}</p>
                                <p className="venue">{paper.venue} ({paper.type})</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PaperList;
