import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination & Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchNews = () => {
        setLoading(true);
        // Build query params
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', 6);
        if (searchTerm) params.append('search', searchTerm);

        fetch(`/api/news?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                // Backend now returns { data: [...], pagination: {...} }
                if (data.pagination) {
                    setNews(data.data);
                    setTotalPages(data.pagination.totalPages);
                    setTotalItems(data.pagination.totalItems);
                } else if (Array.isArray(data)) {
                    // Fallback for old API style (just in case)
                    setNews(data);
                } else {
                    setNews([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchTerm]); // Re-fetch when page or search changes

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to page 1 on search
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    return (
        <div className="container section">
            <h1 style={{ marginBottom: '2rem' }}>News & Announcements</h1>

            {/* Search Bar */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search news..."
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
                <p>Loading updates...</p>
            ) : (
                <>
                    <div className="card-grid">
                        {news.map((item) => (
                            <div key={item.id || item._id} className="card">
                                <img
                                    src={item.imageUrl || 'https://placehold.co/400x200'}
                                    alt={item.title}
                                    className="card-image"
                                    style={{ height: '200px' }}
                                />
                                <div className="card-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(item.date).toLocaleDateString()}</span>
                                        {item.important && <span className="badge" style={{ fontSize: '0.7em', backgroundColor: '#e74c3c' }}>IMPORTANT</span>}
                                    </div>
                                    <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{item.summary}</p>
                                    <Link to={`/news/${item.id || item._id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {news.length === 0 && <p>No news found.</p>}

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

export default News;
