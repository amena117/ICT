import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = filter === 'All' ? '/api/resources' : `/api/resources?type=${filter}`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setResources(data);
                } else {
                    setResources([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [filter]);

    const types = ['All', 'Article', 'Tutorial', 'Whitepaper'];

    return (
        <div className="container section">
            <h1>Resources & Knowledge Base</h1>
            <p style={{ marginBottom: '2rem' }}>Access technical documentation, whitepapers, and tutorials.</p>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {types.map(type => (
                    <button
                        key={type}
                        className={`btn ${filter === type ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter(type)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading resources...</p>
            ) : (
                <div className="card-grid">
                    {resources.map(resource => (
                        <div key={resource._id || resource.id} className="card">
                            <img
                                src={resource.imageUrl || 'https://placehold.co/400x200'}
                                alt={resource.title}
                                className="card-image"
                                style={{ height: '180px' }}
                            />
                            <div className="card-content">
                                <span className="badge" style={{ backgroundColor: '#2980b9', fontSize: '0.7rem', marginBottom: '0.5rem', display: 'inline-block' }}>{resource.type}</span>
                                <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.title}</h3>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#666' }}>{resource.summary}</p>
                                <Link to={`/resources/${resource._id || resource.id}`} className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                                    Read Article
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && resources.length === 0 && <p>No resources found.</p>}
        </div>
    );
};

export default Resources;
