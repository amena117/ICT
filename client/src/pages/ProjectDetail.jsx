import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <div className="container section"><p>Loading project details...</p></div>;
    if (!project) return <div className="container section"><p>Project not found.</p></div>;

    return (
        <div className="container section">
            <Link to="/projects" className="btn btn-secondary" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center' }}>
                &larr; Back to Portfolio
            </Link>

            <article style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {project.imageUrl && (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                )}
                <div style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <span className="badge" style={{ fontSize: '1rem' }}>{project.category}</span>
                    </div>

                    <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: '#2C3E50' }}>{project.title}</h1>

                    {project.title_am && (
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#7f8c8d' }}>{project.title_am}</h2>
                    )}

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                        <p>{project.description}</p>
                        {project.description_am && <p style={{ color: '#666' }}>{project.description_am}</p>}
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Outcome</h3>
                        <p>{project.outcome}</p>
                        {project.outcome_am && <p style={{ color: '#666' }}>{project.outcome_am}</p>}
                    </div>

                    {project.technologies && project.technologies.length > 0 && (
                        <div>
                            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Technologies</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {project.technologies.map((tech, index) => (
                                    <span key={index} style={{
                                        background: '#ecf0f1',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: '#2c3e50'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default ProjectDetail;
