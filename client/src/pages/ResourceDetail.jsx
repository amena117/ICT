import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ResourceDetail = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/resources/${id}`)
            .then(res => res.json())
            .then(data => {
                setResource(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container section"><p>Loading...</p></div>;
    if (!resource) return <div className="container section"><p>Resource not found.</p></div>;

    return (
        <div className="container section">
            <Link to="/resources" className="btn btn-secondary" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center' }}>
                &larr; Back to Resources
            </Link>

            <article style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {resource.imageUrl && (
                    <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                    />
                )}
                <div style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span className="badge" style={{ backgroundColor: '#2980b9' }}>{resource.type}</span>
                        <span style={{ color: '#666' }}>By {resource.author}</span>
                        <span style={{ color: '#ccc' }}>|</span>
                        <span style={{ color: '#666' }}>{new Date(resource.date).toLocaleDateString()}</span>
                    </div>

                    <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: '#2C3E50' }}>{resource.title}</h1>

                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#34495e' }}>
                        <p>{resource.content}</p>
                    </div>

                    {resource.tags && resource.tags.length > 0 && (
                        <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <strong>Tags: </strong>
                            {resource.tags.map(tag => (
                                <span key={tag} style={{ background: '#ecf0f1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem', marginRight: '0.5rem', color: '#7f8c8d' }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default ResourceDetail;
