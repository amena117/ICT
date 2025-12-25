import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    // Pagination & Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        // Build query params
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', 6);
        if (filter !== 'All') params.append('type', filter);
        if (searchTerm) params.append('search', searchTerm);

        fetch(`/api/resources?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data.pagination) {
                    setResources(data.data);
                    setTotalPages(data.pagination.totalPages);
                    setTotalItems(data.pagination.totalItems);
                } else if (Array.isArray(data)) {
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
    }, [filter, page, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(1);
    }

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const types = ['All', 'Article', 'Tutorial', 'Whitepaper'];

    return (
        <div className="container section">
            <h1>Resources & Knowledge Base</h1>
            <p style={{ marginBottom: '2rem' }}>Access technical documentation, whitepapers, and tutorials.</p>

            {/* Filter & Search Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {types.map(type => (
                        <button
                            key={type}
                            className={`btn ${filter === type ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleFilterChange(type)}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        width: '100%',
                        maxWidth: '400px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {loading ? (
                <p>Loading resources...</p>
            ) : (
                <>
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

                    {resources.length === 0 && <p>No resources found.</p>}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                className="btn btn-secondary"
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Resources;
