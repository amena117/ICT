import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/news/${id}`)
            .then(res => res.json())
            .then(data => {
                setNewsItem(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container section"><p>Loading article...</p></div>;
    if (!newsItem) return <div className="container section"><p>Article not found.</p></div>;

    return (
        <div className="container section">
            <Link to="/news" className="btn btn-secondary" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center' }}>
                &larr; Back to News
            </Link>

            <article style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {newsItem.imageUrl && (
                    <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                )}
                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#666' }}>{new Date(newsItem.date).toLocaleDateString()}</span>
                        {newsItem.important && (
                            <span className="badge" style={{ backgroundColor: '#e74c3c' }}>IMPORTANT ADVISORY</span>
                        )}
                    </div>
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: '#2C3E50' }}>{newsItem.title}</h1>
                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        <p>{newsItem.content}</p>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NewsDetail;
