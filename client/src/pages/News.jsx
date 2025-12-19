import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container section">
            <h1 style={{ marginBottom: '2rem' }}>News & Announcements</h1>
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
            {news.length === 0 && <p>Loading updates...</p>}
        </div>
    );
};

export default News;
