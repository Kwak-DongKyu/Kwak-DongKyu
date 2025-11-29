import React, { useState } from 'react';
import papersData from '../data/papers.json';

const PaperList = () => {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'Conference', 'Journal', 'Demo', 'Poster'];

    const filteredPapers = filter === 'All'
        ? papersData
        : papersData.filter(paper => paper.type === filter);

    return (
        <section className="paper-list">
            <h2>Published Papers</h2>
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
                        <a href={paper.link} target="_blank" rel="noopener noreferrer">
                            <h3>{paper.title}</h3>
                        </a>
                        <p>{paper.authors}</p>
                        <p className="venue">{paper.venue} ({paper.type})</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PaperList;
